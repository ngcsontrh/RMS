import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { getCongBos } from '../../services/CongBoService';
import { getDeTais } from '../../services/DeTaiService'; // Assuming this service exists
import type { CongBoData, DeTaiData } from '../../models/data';

const TrangChuHome: React.FC = () => {
    const [congBoChartData, setCongBoChartData] = useState<{ year: string; count: number }[]>([]);
    const [deTaiChartData, setDeTaiChartData] = useState<{ year: string; count: number }[]>([]);

    const { data: congBoData, isLoading: isLoadingCongBo, error: errorCongBo } = useQuery({
        queryKey: ['congBoData'],
        queryFn: () => getCongBos({ pageIndex: 1, pageSize: 100, ten: null })
    });

    const { data: deTaiData, isLoading: isLoadingDeTai, error: errorDeTai } = useQuery({
        queryKey: ['deTaiData'],
        queryFn: () => getDeTais({ pageIndex: 1, pageSize: 100, tacGiaId: null }) 
    });

    // CongBo by year (updated from month to year)
    useEffect(() => {
        if (congBoData) {
            const groupedData = congBoData.items.reduce((acc: Record<string, number>, item: CongBoData) => {
                const year = new Date(item.ngayCongBo!).getFullYear().toString();
                acc[year] = (acc[year] || 0) + 1;
                return acc;
            }, {});
            setCongBoChartData(Object.entries(groupedData).map(([year, count]) => ({ year, count })));
        }
    }, [congBoData]);

    // DeTai by year (using NgayBatDau)
    useEffect(() => {
        if (deTaiData) {
            const groupedData = deTaiData.items.reduce((acc: Record<string, number>, item: DeTaiData) => {
                const year = item.ngayBatDau ? new Date(item.ngayBatDau).getFullYear().toString() : "Không xác định";
                acc[year] = (acc[year] || 0) + 1;
                return acc;
            }, {});
            setDeTaiChartData(Object.entries(groupedData).map(([year, count]) => ({ year, count })));
        }
    }, [deTaiData]);

    if (isLoadingCongBo || isLoadingDeTai) {
        return <div style={{ textAlign: 'center', color: '#0ea5e9', fontSize: '18px', fontWeight: '500' }}>Đang tải dữ liệu...</div>;
    }
    if (errorCongBo || errorDeTai) {
        return <div style={{ textAlign: 'center', color: '#ef4444', fontSize: '18px' }}>{(errorCongBo || errorDeTai || errorTacGia as Error).message}</div>;
    }

    const chartStyle = {
        container: {
            padding: '40px',
            background: '#f8fafc',
            borderRadius: '20px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.05)',
            maxWidth: '1500px',
            margin: '2px auto'
        },
        title: {
            textAlign: 'center' as const,
            marginBottom: '40px',
            fontSize: '32px',
            fontWeight: 700,
            color: '#1e3a8a',
            letterSpacing: '1px'
        }
    };

    const renderChart = (data: { [key: string]: string | number }[], xKey: string, title: string, name: string, formatterUnit: string) => (
        <>
            <h2 style={chartStyle.title}>{title}</h2>
            <ResponsiveContainer width="100%" height={450}>
                <BarChart data={data}>
                    <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0ea5e9" stopOpacity={1} />
                            <stop offset="100%" stopColor="#1e3a8a" stopOpacity={0.9} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#e0f2fe" strokeDasharray="5 5" opacity={0.6} vertical={false} />
                    <XAxis
                        dataKey={xKey}
                        tick={{ fontSize: 14, fill: '#475569', fontFamily: 'Inter, sans-serif' }}
                        tickLine={false}
                        axisLine={{ stroke: '#bae6fd' }}
                        padding={{ left: 30, right: 30 }}
                    />
                    <YAxis
                        tick={{ fontSize: 14, fill: '#475569', fontFamily: 'Inter, sans-serif' }}
                        tickLine={false}
                        axisLine={{ stroke: '#bae6fd' }}
                        tickFormatter={(value: any) => value.toLocaleString()}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#ffffff',
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                            padding: '12px 16px',
                            fontFamily: 'Inter, sans-serif'
                        }}
                        labelStyle={{ fontWeight: '600', color: '#1e3a8a', marginBottom: '6px' }}
                        itemStyle={{ color: '#0ea5e9', fontWeight: '500' }}
                        formatter={(value: number) => [value.toLocaleString(), formatterUnit]}
                    />
                    <Legend
                        verticalAlign="top"
                        height={40}
                        iconType="rect"
                        iconSize={14}
                        formatter={(value: any) => (
                            <span style={{ color: '#1e3a8a', fontSize: '16px', fontWeight: '600', marginLeft: '8px' }}>
                                {value}
                            </span>
                        )}
                    />
                    <Bar
                        dataKey="count"
                        fill="url(#barGradient)"
                        radius={[8, 8, 0, 0]}
                        barSize={40}
                        name={name}
                        animationDuration={1500}
                        animationEasing="ease-in-out"
                    />
                </BarChart>
            </ResponsiveContainer>
        </>
    );

    return (
        <div style={chartStyle.container}>
            {renderChart(congBoChartData, "year", "Thống kê số lượng công bố theo năm", "Số lượng công bố", "Công bố")}
            {renderChart(deTaiChartData, "year", "Thống kê số lượng đề tài theo năm", "Số lượng đề tài", "Đề tài")}
        </div>
    );
};

export default TrangChuHome;
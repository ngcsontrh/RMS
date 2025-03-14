using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using SRM.Data.IRepositories;
using SRM.Shared.Entities;
using SRM.Shared.Exceptions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.Repositories
{
    public class RepositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : EntityBase
    {
        protected readonly AppDbContext _context;
        protected readonly IMapper _mapper;
        private IDbContextTransaction? _transaction;

        public RepositoryBase(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public virtual async Task AddAsync(TEntity entity)
        {
            entity.NgayTao = DateTime.UtcNow;
            entity.NgaySua = DateTime.UtcNow;
            await _context.Set<TEntity>().AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public virtual async Task AddAsync(IEnumerable<TEntity> entities)
        {
            foreach (var item in entities)
            {
                item.NgayTao = DateTime.UtcNow;
                item.NgaySua = DateTime.UtcNow;
            }
            await _context.Set<TEntity>().AddRangeAsync(entities);
            await _context.SaveChangesAsync();
        }

        public async Task BeginTransactionAsync()
        {
            _transaction = await _context.Database.BeginTransactionAsync();
        }

        public async Task CommitTransactionAsync()
        {
            await _transaction!.CommitAsync();
            await _transaction.DisposeAsync();
            _transaction = null;
        }

        public virtual async Task DeleteAsync(int id)
        {
            await _context.Set<TEntity>().Where(x => x.Id == id).ExecuteDeleteAsync();
        }

        public virtual async Task DeleteAsync(IEnumerable<int> ids)
        {
            await _context.Set<TEntity>().Where(x => ids.Contains(x.Id)).ExecuteDeleteAsync();
        }

        public virtual async Task<List<TEntity>> GetAllWithFilter(IQueryable<TEntity> query)
        {
            var result = await query.ToListAsync();
            return result;
        }

        public virtual async Task<TEntity?> GetByIdAsync(int id)
        {
            var result = await _context.Set<TEntity>().FindAsync(id);            
            return result;
        }

        public virtual async Task<List<TEntity>> GetByIdsAsync(IEnumerable<int> ids)
        {
            var result = await _context.Set<TEntity>().Where(x => ids.Contains(x.Id)).ToListAsync();
            return result;
        }
       
        public virtual async Task<(List<TEntity>, int)> GetPageWithFilterAsync(IQueryable<TEntity> query, int pageIndex = 1, int pageSize = 10)
        {
            var result = await query
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .OrderBy(x => x.NgayTao)
                .ToListAsync();
            var count = await query.CountAsync();            
            return (result, count);
        }

        public virtual IQueryable<TEntity> GetQueryable()
        {
            return _context.Set<TEntity>().AsQueryable();
        }

        public async Task RollbackTransactionAsync()
        {
            await _transaction!.RollbackAsync();
            await _transaction.DisposeAsync();
            _transaction = null;
        }

        public virtual async Task UpdateAsync(TEntity entity)
        {
            entity.NgaySua = DateTime.UtcNow;
            var currentEntity = await _context.Set<TEntity>().FindAsync(entity.Id);
            _mapper.Map(entity, currentEntity);
            await _context.SaveChangesAsync();
        }

        public virtual async Task UpdateAsync(IEnumerable<TEntity> entities)
        {
            List<int> ids = entities.Select(x => x.Id).ToList();
            var currentEntities = await _context.Set<TEntity>().Where(x => ids.Contains(x.Id)).ToListAsync();
            foreach (var entity in entities)
            {
                entity.NgaySua = DateTime.UtcNow;
                var currentEntity = currentEntities.SingleOrDefault(x => x.Id == entity.Id);
                _mapper.Map(entity, currentEntity);                
            }
            await _context.SaveChangesAsync();
        }
    }
}

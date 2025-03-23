using SRM.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.IRepositories
{
    public interface IRepositoryBase<TEntity> where TEntity : EntityBase
    {
        Task BeginTransactionAsync();
        Task CommitTransactionAsync();
        Task RollbackTransactionAsync();
        Task AddAsync(TEntity entity);
        Task AddAsync(IEnumerable<TEntity> entities);
        Task UpdateAsync(TEntity entity);
        Task UpdateAsync(IEnumerable<TEntity> entities);
        Task DeleteAsync(int id);
        Task DeleteAsync(IEnumerable<int> ids);
        Task<TEntity?> GetByIdAsync(int id);
        Task<List<TEntity>> GetByIdsAsync(IEnumerable<int> ids);
        Task<List<TEntity>> GetAllWithFilter(IQueryable<TEntity> query);
        Task<List<TEntity>> GetAllAsync();
        Task<(List<TEntity>, int)> GetPageWithFilterAsync(IQueryable<TEntity> query, int pageIndex = 1, int pageSize = 10);
        IQueryable<TEntity> GetQueryable();
    }
}

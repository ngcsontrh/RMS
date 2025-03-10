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
        public Task BeginTransactionAsync();
        public Task CommitTransactionAsync();
        public Task RollbackTransactionAsync();
        public Task AddAsync(TEntity entity);
        public Task AddAsync(IEnumerable<TEntity> entities);
        public Task UpdateAsync(TEntity entity);
        public Task UpdateAsync(IEnumerable<TEntity> entities);
        public Task DeleteAsync(int id);
        public Task DeleteAsync(IEnumerable<int> ids);
        public Task<TEntity?> GetByIdAsync(int id);
        public Task<List<TEntity>> GetByIdsAsync(IEnumerable<int> ids);
        public Task<List<TEntity>> GetAllWithFilter(IQueryable<TEntity> query);
        public Task<(List<TEntity>, int)> GetPageWithFilterAsync(IQueryable<TEntity> query, int pageIndex = 1, int pageSize = 10);
        public IQueryable<TEntity> GetQueryable();
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.IRepositories
{
    public interface IRepositoryBase<TEntity> where TEntity : class
    {
        public Task AddAsync(TEntity entity);
        public Task AddAsync(IEnumerable<TEntity> entities);
        public Task AddAndSaveAsync(TEntity entity);
        public Task AddAndSaveAsync(IEnumerable<TEntity> entities);
        public Task UpdateAsync(TEntity entity);
        public Task UpdateAsync(IEnumerable<TEntity> entities);
        public Task UpdateAndSaveAsync(TEntity entity);
        public Task UpdateAndSaveAsync(IEnumerable<TEntity> entities);
        public Task ExecuteDeleteAsync(Guid id);
        public Task ExecuteDeleteAsync(IEnumerable<Guid> ids);
        public Task<TEntity?> GetByIdAsync(Guid id);
        public Task<List<TEntity>> GetListAsync(Expression<Func<TEntity, bool>> expression);
        public Task<(List<TEntity>, int)> GetPageAsync(Expression<Func<TEntity, bool>> expression, int pageIndex = 1, int pageSize = 10);
        public Task<List<TEntity>> GetListAsync();
        public Task<bool> AnyAsync(Expression<Func<TEntity, bool>> expression);
    }
}

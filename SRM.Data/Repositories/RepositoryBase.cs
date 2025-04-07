using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using SRM.Data.IRepositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SRM.Data.Repositories
{
    public class RepositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : class
    {
        protected readonly AppDbContext _context;

        public RepositoryBase(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAndSaveAsync(TEntity entity)
        {
            await _context.Set<TEntity>().AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task AddAndSaveAsync(IEnumerable<TEntity> entities)
        {
            await _context.Set<TEntity>().AddRangeAsync(entities);
            await _context.SaveChangesAsync();
        }

        public async Task AddAsync(TEntity entity)
        {
            await _context.Set<TEntity>().AddAsync(entity);
        }

        public async Task AddAsync(IEnumerable<TEntity> entities)
        {
            await _context.Set<TEntity>().AddRangeAsync(entities);
        }

        public async Task<bool> AnyAsync(Expression<Func<TEntity, bool>> expression)
        {
            bool result = await _context.Set<TEntity>().AnyAsync(expression);
            return result;
        }

        public async Task ExecuteDeleteAsync(Guid id)
        {
            await _context.Set<TEntity>().Where(e => EF.Property<Guid>(e, "Id") == id).ExecuteDeleteAsync();
        }

        public async Task ExecuteDeleteAsync(IEnumerable<Guid> ids)
        {
            await _context.Set<TEntity>().Where(e => ids.Contains(EF.Property<Guid>(e, "Id"))).ExecuteDeleteAsync();
        }

        public async Task<TEntity?> GetByIdAsync(Guid id)
        {
            var entity = await _context.Set<TEntity>().FindAsync(id);
            return entity;
        }

        public Task<List<TEntity>> GetListAsync()
        {
            var entities = _context.Set<TEntity>().AsNoTracking().ToListAsync();
            return entities;
        }

        public async Task<List<TEntity>> GetListAsync(Expression<Func<TEntity, bool>> expression)
        {
            var entities = await _context.Set<TEntity>().Where(expression).ToListAsync();
            return entities;
        }

        public Task<(List<TEntity>, int)> GetPageAsync(Expression<Func<TEntity, bool>> expression, int pageIndex = 1, int pageSize = 10)
        {
            var pageResultTask = _context.Set<TEntity>()
                .Where(expression)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .AsNoTracking()
                .ToListAsync();
            var totalCountTask = _context.Set<TEntity>().CountAsync(expression);
            Task.WaitAll(pageResultTask, totalCountTask);

            var pageResult = pageResultTask.Result;
            var totalCount = totalCountTask.Result;

            return Task.FromResult((pageResult, totalCount));
        }

        public async Task UpdateAndSaveAsync(TEntity entity)
        {
            _context.Set<TEntity>().Update(entity);
            await _context.SaveChangesAsync();
        }

        public Task UpdateAndSaveAsync(IEnumerable<TEntity> entities)
        {
            _context.Set<TEntity>().UpdateRange(entities);
            return _context.SaveChangesAsync();
        }

        public Task UpdateAsync(TEntity entity)
        {
            _context.Set<TEntity>().Update(entity);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(IEnumerable<TEntity> entities)
        {
            _context.Set<TEntity>().UpdateRange(entities);
            return Task.CompletedTask;
        }
    }
}

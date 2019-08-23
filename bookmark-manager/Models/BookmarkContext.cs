using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace bookmark_manager.Models
{
    public class BookmarkContext : DbContext
    {
        public BookmarkContext(DbContextOptions<BookmarkContext> options)
            : base(options)
        {
        }

        public DbSet<BookmarkItem> BookmarkItems { get; set; }
    }
}

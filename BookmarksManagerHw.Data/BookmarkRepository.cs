using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace BookmarksManagerHw.Data
{
    public class BookmarkRepository
    {
        private readonly string _connectionString;

        public BookmarkRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Bookmark> GetBookmarks(int userId)
        {
            var ctx = new BookmarkDataContext(_connectionString);
            return ctx.Bookmarks.Where(b => b.UserId == userId).ToList();
        }

        public void Add(Bookmark bookmark, int userId)
        {
            var ctx = new BookmarkDataContext(_connectionString);
            bookmark.UserId = userId;
            ctx.Bookmarks.Add(bookmark);
            ctx.SaveChanges();
        }

        public List<TopBookmarkedLink> GetTopBookmarkedLinks()
        {
            var ctx = new BookmarkDataContext(_connectionString);
            return ctx.BookmarkedLinks.FromSqlRaw($"SELECT TOP 5 Url, COUNT(url) AS 'Count' FROM Bookmarks GROUP BY Url ORDER BY Count DESC").ToList();
        }

        public void Update (int id, string title)
        {
            var ctx = new BookmarkDataContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"UPDATE Bookmarks SET Title = {title} WHERE Id = {id}");
        }

        public void Delete (int id)
        {
            var ctx = new BookmarkDataContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"DELETE FROM Bookmarks WHERE Id = {id}");
        }
    }
}

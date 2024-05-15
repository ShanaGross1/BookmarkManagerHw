using BookmarksManagerHw.Data;
using BookmarksManagerHw.Web.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookmarksManagerHw.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private string _connectionString;

        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }


        [HttpPost("add")]
        public void Add(Bookmark bookmark)
        {
            var userRepo = new UserRepository(_connectionString);
            int userId = userRepo.GetByEmail(User.Identity.Name).Id;

            var repo = new BookmarkRepository(_connectionString);
            repo.Add(bookmark, userId);
        }

        [HttpGet("get")]
        public List<Bookmark> GetBookmarks()
        {
            var userRepo = new UserRepository(_connectionString);
            int userId = userRepo.GetByEmail(User.Identity.Name).Id;

            var bookmarkRepo = new BookmarkRepository(_connectionString);
            return bookmarkRepo.GetBookmarks(userId);
        }

        [HttpGet("gettoplinks")]
        public List<TopBookmarkedLink> GetTopBookmarkedLinks()
        {
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetTopBookmarkedLinks();
        }

        [HttpPost("update")]
        public void Update(UpdateViewModel vm)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.Update(vm.Id, vm.Title);
        }

        [HttpPost("delete")]
        public void Delete (DeleteViewModel vm)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.Delete(vm.Id);
        }
    }
}

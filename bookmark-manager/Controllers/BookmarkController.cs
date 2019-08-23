using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using bookmark_manager.Models;
using bookmark_manager.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace bookmark_manager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private readonly BookmarkContext _context;
        private readonly ScreenshotService _screenshotService;

        public BookmarkController(BookmarkContext context, ScreenshotService screenshotService)
        {
            _context = context;
            _screenshotService = screenshotService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookmarkItem>>> GetAllBookmarks()
        {
            return await _context.BookmarkItems.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookmarkItem>> GetBookmarkItem(long id)
        {
            var bookmarkItem = await _context.BookmarkItems.FindAsync(id);
            if (bookmarkItem == null)
            {
                return NotFound();
            }

            return bookmarkItem;
        }

        [HttpGet("{id}/screenshot")]
        public async Task<ActionResult<byte[]>> GetBookmarkScreenshot(long id)
        {
            var bookmarkItem = await _context.BookmarkItems.FindAsync(id);
            if (bookmarkItem == null)
            {
                return NotFound();
            }

            if (bookmarkItem.Screenshot == null)
            {
                bookmarkItem.Screenshot = _screenshotService.CaptureScreenshotAsBytes(bookmarkItem.Url);
                _context.Update(bookmarkItem);
                _context.SaveChanges();
            }

            return File(bookmarkItem.Screenshot, "image/png");
        }

        [HttpPost]
        public async Task<ActionResult<BookmarkItem>> AddBookmarkItem(BookmarkItem item)
        {
            _context.BookmarkItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBookmarkItem), new { id = item.Id }, item);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace bookmark_manager.Models
{
    public class BookmarkItem
    {
        public long Id { get; set; }
        public string Url { get; set; }
        public string ShortDescription { get; set; }
        public string Title { get; set; }
        public byte[] Screenshot { get; set; }
    }
}

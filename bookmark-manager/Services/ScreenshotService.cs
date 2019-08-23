using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace bookmark_manager.Services
{
    public class ScreenshotService
    {
        private readonly ChromeDriver _chromeDriver;
        private readonly ChromeOptions _chromeOptions = new ChromeOptions();
        private readonly IOptions _options;

        public ScreenshotService()
        {
            // Set command line arguments
            _chromeOptions.AddArgument("headless");//Comment if we want to see the window. 
            _chromeOptions.AddArgument("hide-scrollbars");
            // Create Driver
            _chromeDriver = new ChromeDriver(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), _chromeOptions);
            // Set Options
            _options = _chromeDriver.Manage();
            _options.Window.Size = new System.Drawing.Size(1920, 1080);
        }

        public byte[] CaptureScreenshotAsBytes(string url)
        {
            _chromeDriver.Navigate().GoToUrl(url);
            var screenshot = (_chromeDriver as ITakesScreenshot).GetScreenshot();
            return screenshot.AsByteArray;
        }

        ~ScreenshotService()
        {
            _chromeDriver.Close();
            _chromeDriver.Quit();
        }
    }
}

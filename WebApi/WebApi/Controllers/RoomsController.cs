using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private static readonly List<Room> rooms = new List<Room>
        {
            new Room { RoomNumber = 101, Type = "Standard", Price = 50, Statusbar = "còn trống", Idtang = 1 },
            new Room { RoomNumber = 102, Type = "Deluxe", Price = 100, Statusbar = "còn trống", Idtang = 1 },
            new Room { RoomNumber = 103, Type = "Suite", Price = 200, Statusbar = "có khách", Idtang = 1 },
            new Room { RoomNumber = 104, Type = "Suite", Price = 200, Statusbar = "có khách", Idtang = 1 },
            new Room { RoomNumber = 105, Type = "Suite", Price = 200, Statusbar = "đặt online", Idtang = 1 },
            new Room { RoomNumber = 106, Type = "Suite", Price = 200, Statusbar = "đặt online", Idtang = 1 },
            new Room { RoomNumber = 107, Type = "Suite", Price = 200, Statusbar = "còn trống", Idtang = 2 },
            new Room { RoomNumber = 108, Type = "Suite", Price = 200, Statusbar = "còn trống", Idtang = 2 },
            new Room { RoomNumber = 109, Type = "Suite", Price = 200, Statusbar = "còn trống", Idtang = 3 },
        };

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
        {
            return Ok(rooms);
        }

        [HttpGet("{roomNumber}")]
        public async Task<ActionResult<Room>> GetRoom(int roomNumber)
        {
            var room = rooms.FirstOrDefault(r => r.RoomNumber == roomNumber);
            if (room == null)
            {
                return NotFound();
            }
            return Ok(room);
        }
    }

    public class Room
    {
        public int RoomNumber { get; set; }
        public string Type { get; set; }
        public int Price { get; set; }
        public string Statusbar { get; set; }
        public int Idtang { get; set; }
    }
}


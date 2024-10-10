using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using WebApi.Models;

public class ChatHub : Hub
{
    public async Task SendMessage(int cuocHoiThoaiId, int nhanVienGuiId, string noiDung)
    {
        await Clients.All.SendAsync("ReceiveMessage", cuocHoiThoaiId, nhanVienGuiId, noiDung);
    }



    /*   public async Task SendMessage(string user, string message)
       {
           Console.WriteLine($"SendMessage called with cuochoithoaiid: {user}, nhanvienguiid: {message}, noidung: {message}");

           await Clients.All.SendAsync("ReceiveMessage", user, message);
       }*/
}

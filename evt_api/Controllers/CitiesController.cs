using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using evt_api.Models;

namespace evt_api.Controllers
{
    [Route("api/[controller]")]
    public class CitiesController : Controller
    {
        // GET: api/cities
        [HttpGet]
        public IEnumerable<City> Get()
        {
            CityManager HM = new CityManager();
            return HM.GetAll;
        }

        // GET api/cities/7
        [HttpGet("{id}")]
        public City Get(int id)
        {
            CityManager CM = new CityManager();
            return CM.GetCityByID(id);
        }

    }
}

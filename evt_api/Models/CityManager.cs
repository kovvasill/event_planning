using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace evt_api.Models
{
    public class CityManager
    {
        readonly List<City> _cities = new List<City>() {
            new City { ID = 1, Name = "Lviv", Country = "UA"},
            new City { ID = 2, Name ="Copenhagen", Country = "DK"},
            new City { ID = 3, Name ="Kyiv", Country = "UA"},
            new City { ID = 4, Name ="Warsaw", Country = "PL"},
            new City { ID = 5, Name ="London", Country = "UK"},
            new City { ID = 6, Name ="Munich", Country = "DE"},
            new City { ID = 7, Name ="Rzeszow", Country = "PL"},
        };
        public IEnumerable<City> GetAll { get { return _cities; } }

        public List<City> GetCitiesByCountry(string country)
        {
            return _cities.Where(o => o.Country.ToLower().Equals(country.ToLower())).ToList();
        }

        public City GetCityByID(int Id)
        {
            return _cities.Find(o => o.ID == Id);
        }
    }
}

import React, { useEffect } from 'react';

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
let years = [2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961, 1960, 1959, 1958, 1957, 1956, 1955, 1954, 1953, 1952, 1951, 1950, 1949, 1948, 1947, 1946, 1945, 1944, 1943, 1942, 1941, 1940, 1939, 1938, 1937, 1936, 1935, 1934, 1933, 1932, 1931, 1930, 1929, 1928, 1927, 1926, 1925, 1924, 1923, 1922, 1921, 1920]

function SetBirthday({setBirthday}) {

    return (
        <div className='section'>
            <h2 className='pref-form-head'>My birthday:</h2>
            <div className='drpdwn-sel'>
                <div className='drpdwn-sel-top'>
                    <div className='sel-prefs'>
                        <button className='drpdwn-def sm'>Month</button>
                        <div className='sel'>
                            {
                                months.map((month) => (
                                    <button className='drpdwn-opt sm' value={month}>{month}</button>
                                ))
                            }
                        </div>
                    </div>
                    <div className='sel-prefs'>
                        <button className='drpdwn-def sm'>Day</button>
                        <div className='sel'>
                            {
                                days.map((day) => (
                                    <button className='drpdwn-opt sm' value={day}>{day}</button>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='drpdwn-sel-bot'>
                    <div className='sel-prefs'>
                        <button className='drpdwn-def lg'>Year</button>
                        <div className='sel'>
                            <div className='sel'>
                                {
                                    years.map((year) => (
                                        <button className='drpdwn-opt lg' value={year}>{year}</button>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SetBirthday;

import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTVmYTE3YzBhMzU0YTlkZDg1ZWM0NmI5YWY5ZTI2ZiIsInN1YiI6IjY0ZjFiZTU0ZGJiYjQyMDBjNGVhYTU1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gkk8vgxn8gS60qbbtg8o1rrb0-savYNElKJTvYWptII';

const MyAPI = {
    async get(url) {
        try {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await axios.get(`${url}`, { headers });
            return { status: response.status, data: response.data };
        } catch (error) {
            return { status: error.response?.status || 501, error: error.message };
        }
    },
    async post(url, data, token = null) {
        try {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await axios.post(`${url}`, data, { headers });
            return { status: response.status, data: response.data };
        } catch (error) {
            return { status: error.response?.status || 500, error: error.message };
        }
    }
};

export const Token = {
    setToken(token) {
        sessionStorage.setItem('token', token);
    },
    getToken() {
        return sessionStorage.getItem('token');
    }
};

export const FormatDate = (date, formatString) => {
    const myDate = new Date(date);
    const year = myDate.getFullYear();
    const month = String(myDate.getMonth() + 1).padStart(2, '0');
    const day = String(myDate.getDate()).padStart(2, '0');

    const dateFormats = {
        'dd-mm-yyyy': `${day}-${month}-${year}`,
        'dd/mm/yyyy': `${day}/${month}/${year}`,
        'mm-dd-yyyy': `${month}-${day}-${year}`,
        'mm/dd/yyyy': `${month}/${day}/${year}`,
        'yyyy-dd-mm': `${year}-${day}-${month}`,
        'yyyy/mm/dd': `${year}/${month}/${day}`
    };

    return dateFormats[formatString];
};

export const FormattedTime = (time, format) => {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC'
    };

    const now = new Date(time);
    const formattedTime = now.toLocaleString('en-US', options);

    return formattedTime;
};

export const parseTime = (timeString) => {
    const [hh, mm, ss] = timeString.split(':').map(Number);
    return { hours: hh, minutes: mm, seconds: ss };
}


export default MyAPI;

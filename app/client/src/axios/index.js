import axios from 'axios';

// axios instance used across client
const axi = axios.create({
    baseURL: 'http://localhost:3050/api',
    timeout: 2000,
    // add bearer token
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZGNjYjZlMi1lZjJlLTQzMzQtOWYyZi1kNTY5Y2VlZGI4OGYiLCJpYXQiOjE2NjQ1NDExNTcsImV4cCI6MTY2NDU0NDc1N30.P4Otv0ZirywKbTezv7QODDtuYKAVbCLVsJJwxWjsvVU`,
    },
});

export default axi;

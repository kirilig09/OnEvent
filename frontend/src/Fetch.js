let csrfToken;
let isAuthenticated = false;    

const csrf = () => {
    console.log("uga buga");
    fetch("http://127.0.0.1:5000/api/getcsrf", {
        credentials: "include",
    })
    .then((res) => {
        csrfToken = res.headers.get(["X-CSRFToken"]);
        console.log(csrfToken);
    })
    .catch((err) => {
        console.log(err);
    });
};

export const login = (username, password) => {
    fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
        },
        credentials: "include",
        body: JSON.stringify({ username: username, password: password }),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        if (data.login == true) {
            isAuthenticated = true;
        }
    })
    .catch((err) => {
        console.log(err);
    });
};

export const whoami = () => {
    fetch("http://127.0.0.1:5000/api/data", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
        },
        credentials: "include",
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        alert(`Welcome, ${data.username}!`);
    })
    .catch((err) => {
        console.log(err);
    });
};

export const logout = () => {
    fetch("http://127.0.0.1:5000/api/logout", {
        credentials: "include",
    })
    .then(() => {
        isAuthenticated = false;
    })
    .catch((err) => {
        console.log(err);
    });
};

export const register = (username, password, role, event) => {
    fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ username: username, password: password, role: role, event: event })
    })
};

export const create_event = (name) => {
    fetch('http://127.0.0.1:5000/api/create-event', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ name: name })
    })
};

// Every time

export const get_session = () => {
    fetch("http://127.0.0.1:5000/api/getsession", {
        credentials: "include",
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        if (data.login == true) {
        isAuthenticated = true;
        } else {
        isAuthenticated = false;
        csrf();
        }
    })
    .catch((err) => {
        console.log(err);
    });
}
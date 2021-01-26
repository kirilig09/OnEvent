let csrfToken;
let isAuthenticated = false;    

const csrf = () => {
    console.log("uga buga");
    fetch("/api/getcsrf", {
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

export const isLogged = () => {
    return isAuthenticated
}

export const login = (username, password) => {
    fetch("/api/login", {
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
    const user = fetch("/api/data", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
        },
        credentials: "include",
    });
    console.log(JSON.stringify(user));
    return user;
};

export const get_my_role = async () => {
    const user_role = await fetch("/api/user-role", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        },
        credentials: "include",
    });
    console.log(user_role);
    return user_role;
};

export const logout = () => {
    fetch("/api/logout", {
        headers: {
            "X-CSRFToken": csrfToken,
        },
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
    fetch('/api/register', {
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
    fetch('/api/create-event', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ name: name })
    })
};

export const register_company = (name, event_id) => {
    fetch('/api/create-company', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ name: name, event_id: event_id })
    })
}

export const list_users = async (event_id) => {
    const response = await fetch('/api/list-users?event_id='+event_id, {
       method: 'GET',
       headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
       }
    })
    console.log(response.json());
    return response.json();
};

// Every time

export const get_session = () => {
    fetch("/api/getsession", {
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
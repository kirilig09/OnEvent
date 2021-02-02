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

export const whoami = async() => {
    const response = await fetch("/api/data", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
        },
        credentials: "include",
    });
    const user = await response.json();
    console.log(user);
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

export const register = (username, password) => {
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ username: username, password: password })
    })
};

export const register_participant = (username, password, c_name, c_password, event) => {
    fetch('/api/register-participant', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ username: username, password: password, company_name: c_name, company_password: c_password, event: event })
    })
}

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

export const register_company = (name, password, image_link, event_id) => {
    fetch('/api/create-company', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ name: name, password: password, image_link: image_link, event_id: event_id })
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
    return await response.json();
};

export const list_companies = async (event_id) => {
    const response = await fetch('/api/list-companies?event_id='+event_id, {
       method: 'GET',
       headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
       }
    });
    return await response.json();
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
        }
        csrf();
    })
    .catch((err) => {
        console.log(err);
    });
}
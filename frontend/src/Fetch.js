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

export const payment_checkout_session = async (company_id) => {
    const response = await fetch("/api/create-checkout-session", {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({ company_id: company_id })
    });

    const session = await response.json();
    console.log(session);
    return session;
}

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

export const register = (username, password, email) => {
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ username: username, password: password, email: email })
    })
};

export const register_participant = (username, password, email, c_name, c_password, event) => {
    fetch('/api/register-participant', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ username: username, password: password, email: email, company_name: c_name, company_password: c_password, event: event })
    })
}

export const create_event = (name, subscriptable, payment, is_private) => {
    fetch('/api/create-event', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ name: name, subscriptable: subscriptable, payment: payment, is_private: is_private })
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

export const list_active_events = async () => {
    const response = await fetch('/api/list-active-events', {
        method: 'GET',
        headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             "X-CSRFToken": csrfToken,
        }
     });
     return await response.json();
}

export const list_all_events = async () => {
    const response = await fetch('/api/list-all-events', {
        method: 'GET',
        headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             "X-CSRFToken": csrfToken,
        }
     });
     return await response.json();
}

export const list_users = async (event_id) => {
    const response = await fetch('/api/list-participating?event_id='+event_id, {
       method: 'GET',
       headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
       }
    })
    const participants = await response.json();
    console.log(participants);
    return participants;
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

export const get_participant_company = async (user_id) => {
    const response = await fetch('/api/get-company?user_id='+user_id, {
       method: 'GET',
       headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
       }
    });
    const company =  await response.json();
    console.log(company);
    return company;
};

export const load_messages = async (company_id) => {
    const response = await fetch("/api/load-messages?company_id="+company_id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        }
    });
    const chat = await response.json();
    console.log(chat);
    return chat;
}

export const deactivate_event = async (event_id) => {
    fetch("/api/deactivate-event", {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ event_id: event_id})
    });
}

export const send_message = async (content, sender_id, company_id) => {
    fetch("/api/send-message", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ content: content, sender_id: sender_id, company_id: company_id})
    });
}

export const get_user = async (user_id) => {
    const response = await fetch("/api/get-user?user_id="+user_id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        }
    });
    const user = await response.json();
    console.log(user);
    return user;
}

export const update_image = async (company_id, new_image) => {
    fetch("/api/update-image", {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ company_id: company_id, new_image: new_image })
    });
}

export const join_event = async (user_id, event_id) => {
    fetch("/api/join-event", {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ user_id: user_id, event_id: event_id })
    });
}

export const payment_status = async (company_id) => {
    const response = await fetch("/api/payment-status?company_id="+company_id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        }
    });
    const status = await response.json();
    console.log(status);
    return status;
}

export const subscribe_company = async (company_id) => {
    fetch("/api/subscribe-company", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ company_id: company_id })
    });
}

export const check_for_invite = async (event_id) => {
    const response = await fetch("/api/find-invite?event_id="+event_id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        }
    });
    const result = await response.json();
    console.log(result);
    return result;
}

export const send_invite = async (event_name, user_email) => {
    fetch("/api/send-invite", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ event_name: event_name, user_email: user_email })
    });
}

// Every time

export const get_session = async () => {
    const response = await fetch("/api/getsession", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": csrfToken,
        }
    })
    const session = response.json();
    console.log(session.login);
    if(session.login == true) {
        isAuthenticated = true;
    } else {
        isAuthenticated = false;
    }
    csrf();
    return session;
}
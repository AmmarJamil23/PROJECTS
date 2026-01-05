export function fetchSessions() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    subject: "Math",
                    day: "Monday",
                    duration: 60,
                    completed: false,
                },
                {
                    id: 2,
                    subject: "Physics",
                    day: "Tuesday",
                    duration: 30,
                    completed: true,
                }
            ])
        }, 1000);
    });
}
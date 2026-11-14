# Role-based sign-in prototype

Open `index.html` to choose Admin, Employee, or Customer. Each role has a separate sign-in page.

## Files
- `index.html`: role selection
- `admin.html`, `employee.html`, `customer.html`: separate role sign-in screens
- `styles.css`: shared responsive styling
- `app.js`: basic client-side form validation and preview message

## Security status
This is only a frontend prototype. It does not authenticate users, store credentials, or connect to an API. Do not enter real passwords. The Spring Boot backend will later implement password hashing, role checks, session/JWT handling, and customer-specific authorization.

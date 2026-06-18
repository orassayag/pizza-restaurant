# Setup and Usage Instructions

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Using the Application](#using-the-application)
6. [Available Commands](#available-commands)
7. [Troubleshooting](#troubleshooting)
8. [Development Tips](#development-tips)
9. [Docker Support](#docker-support)
10. [Best Practices](#best-practices)
11. [Extending the Application](#extending-the-application)
12. [Documentation](#documentation)
13. [External Resources](#external-resources)
14. [Support](#support)

## Prerequisites

### System Requirements

- **Node.js**: Version 18 or higher
- **npm**: Comes with Node.js
- **MongoDB**: Installed and running locally
- **Operating System**: macOS, Linux, or Windows
- **Memory**: 2GB RAM minimum
- **Disk Space**: 500MB for application and dependencies

### Knowledge Prerequisites

- Basic understanding of command line/terminal
- Familiarity with React and Node.js (helpful but not required)
- Understanding of real-time communication (helpful but not required)

## Initial Setup

### 1. Install Dependencies

1. Clone or download the repository:

   ```bash
   git clone https://github.com/orassayag/pizza-restaurant.git
   cd pizza-restaurant
   ```

2. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

### 2. Start MongoDB

Ensure MongoDB is running:

```bash
# If using MongoDB directly
mongod

# If using Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

## Configuration

### Server Configuration

Edit `server/config/env.json` to configure:

- MongoDB connection URL (default: `mongodb://localhost:27017/pizza-restaurant`)
- Server port (default: 5000)
- Environment settings

### Client Configuration

Edit `client/src/config/constants.config.js` to configure:

- Socket.IO server URL
- Application constants

## Running the Application

### Start the Server

```bash
cd server
npm run dev
```

The server will:

1. Start on port 5000 (or configured port)
2. Connect to MongoDB
3. Initialize Socket.IO
4. Create restaurant workers
5. Wait for incoming connections

**Expected output:**

```
Web server initiated successfully: http://localhost:5000
MongoDB initiated successfully...
SocketIO initiated successfully...
```

### Start the Client

In a new terminal:

```bash
cd client
npm run dev
```

The client will:

1. Start on port 3000
2. Automatically open in browser
3. Connect to Socket.IO server

**URL:** http://localhost:3000

## Using the Application

### Placing Orders

1. Click the red **"Order"** button in the top-right corner
2. Select a pizza size (Small, Medium, Large)
3. Choose toppings with segmentation options (Full, Left Half, Right Half)
4. Click **"Add to Cart"** to add the pizza
5. Repeat for multiple pizzas
6. Click **"Checkout"** to submit all orders

### Viewing Orders

Once orders are submitted:

- Orders appear in the restaurant dashboard table
- Each order shows:
  - User information (name, gender, avatar)
  - Pizza size
  - Number of toppings
  - Current stage (Dough → Topping → Oven → Serving → Done)
  - Processing time (when completed)
- Orders update in real-time as they progress through stages

### Understanding the Process

Orders go through these stages:

1. **Pending** - Waiting to be processed
2. **Dough** - Dough chef prepares the base (7 seconds, 2 workers)
3. **Topping** - Topping chefs add toppings (4 seconds per 2 toppings, 3 workers)
4. **Oven** - Pizza bakes (10 seconds, 1 oven)
5. **Serving** - Waiter serves the pizza (5 seconds, 2 waiters)
6. **Done** - Order completed

**Worker Simulation:**

- Workers are automatically assigned to available orders
- If all workers are busy, orders wait in queue
- Multiple orders can be processed simultaneously based on worker availability

## Available Commands

### Development Commands

#### Server Commands

```bash
# Development mode (auto-reload on changes)
npm run dev

# Production build and start
npm run start

# Lint code
npm run lint

# Format code with Prettier
npm run prettier-fix

# Check formatting
npm run prettier-check

# Kill all Node processes (Windows)
npm run kill
```

#### Client Commands

```bash
# Development mode (auto-open browser)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Running Scripts

**Server Scripts:**

```bash
cd server
npm run dev          # Development mode
npm run start        # Production mode
npm run lint         # Lint code
npm run prettier-fix # Format code
```

**Client Scripts:**

```bash
cd client
npm run dev          # Development mode
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Lint code
```

## Troubleshooting

### MongoDB Connection Issues

**Error:** `MongoNetworkError: connect ECONNREFUSED`

**Solution:**

- Ensure MongoDB is running: `mongod` or `docker start mongodb`
- Check connection URL in `server/config/env.json`

### Socket.IO Connection Failed

**Error:** Client shows "Disconnected from socket.io server"

**Solution:**

- Ensure server is running on port 5000
- Check firewall settings
- Verify Socket.IO URL in client configuration

### Port Already in Use

**Error:** `EADDRINUSE: address already in use`

**Solution:**

```bash
# Find process using port 5000 (server)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Find process using port 3000 (client)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Orders Not Appearing

**Solution:**

1. Refresh the browser page
2. Check browser console for errors
3. Restart server and client
4. Clear MongoDB database:
   ```bash
   mongo
   use pizza-restaurant
   db.dropDatabase()
   ```

### Build Errors

**Solution:**

```bash
# Clear dependencies and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache (client)
rm -rf .next
npm run build
```

## Development Tips

### Database Inspection

View orders in MongoDB:

```bash
mongo
use pizza-restaurant
db.orders.find().pretty()
db.users.find().pretty()
```

### Monitoring Logs

Server logs are output to console using Winston logger. Watch for:

- Worker assignments
- Stage transitions
- Errors and exceptions

### Hot Reload

Both server (nodemon) and client (Next.js) support hot reload during development.

### Debugging Socket.IO

Add logging to track socket events:

```javascript
// Client
socket.on('connect', () => console.log('Connected:', socket.id));
socket.onAny((event, ...args) => console.log(event, args));

// Server
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.onAny((event, ...args) => console.log(event, args));
});
```

## Docker Support (Optional)

### MongoDB with Docker

```bash
# Start MongoDB container
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongodb-data:/data/db \
  mongo

# Stop MongoDB
docker stop mongodb

# Remove MongoDB
docker rm mongodb
docker volume rm mongodb-data
```

## Best Practices

### Before Development

1. **Start with MongoDB**: Ensure MongoDB is running before starting the server
2. **Install Dependencies**: Run npm install in both server and client directories
3. **Check Configuration**: Verify connection URLs in config files

### Code Quality

1. **Follow TypeScript**: Use TypeScript on the server for type safety
2. **Lint Code**: Run npm run lint before committing
3. **Format Code**: Use Prettier for consistent formatting

### Development Workflow

1. **Use Hot Reload**: Both server and client support hot reload for faster development
2. **Monitor Logs**: Check server logs for worker assignments and errors
3. **Test Features**: Test the full ordering flow regularly

## Extending the Application

### Adding New Features

1. **Server-side**: Add new functionality in `server/src/services/restaurant.service.ts`
2. **Client-side**: Add new components in `client/src/components/`
3. **Socket Events**: Add new socket events in both server and client

### Customizing Worker Behavior

Edit worker configuration in `server/src/services/restaurant.service.ts`

### Adding New Stages

Add new stage enums in `server/src/bl/enums/stage.enum.ts` and update the service accordingly

## Documentation

- **README.md**: Project overview and features
- **CONTRIBUTING.md**: Contribution guidelines
- **CHANGELOG.md**: Version history
- **INSTRUCTIONS.md**: This file - setup and usage instructions

## External Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **React Documentation**: https://react.dev
- **Node.js Documentation**: https://nodejs.org/docs
- **Socket.IO Documentation**: https://socket.io/docs
- **MongoDB Documentation**: https://www.mongodb.com/docs
- **TypeScript Documentation**: https://www.typescriptlang.org/docs
- **Tailwind CSS Documentation**: https://tailwindcss.com/docs

## Support

For questions, issues, or contributions:

- **GitHub Issues**: [https://github.com/orassayag/pizza-restaurant/issues](https://github.com/orassayag/pizza-restaurant/issues)
- **Email**: orassayag@gmail.com

## Notes

- The application uses dummy user data generated with the `chance` library
- Pizza images are CSS sprites (borrowed from Domino's Pizza - for educational purposes only)
- Worker names are randomly generated
- Processing times are simulated delays
- MongoDB collections are created automatically on first run

## Last Updated

June 18, 2026

## Version

1.0.0

## Author

- **Or Assayag** - _Initial work_ - [orassayag](https://github.com/orassayag)
- Or Assayag <orassayag@gmail.com>
- GitHub: https://github.com/orassayag
- StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
- LinkedIn: https://linkedin.com/in/orassayag

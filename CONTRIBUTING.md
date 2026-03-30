# Contributing

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](LICENSE).

Everyone is welcome to contribute to this project. Contributing doesn't just mean submitting pull requests—there are many different ways for you to get involved, including answering questions, reporting issues, improving documentation, or suggesting new features.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:
1. Check if the issue already exists in the [GitHub Issues](https://github.com/orassayag/pizza-restaurant/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Your environment details (OS, Node version, MongoDB version)
   - Browser and version (for client-side issues)

### Submitting Pull Requests

1. Fork the repository
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following the code style guidelines below
4. Test your changes thoroughly (both server and client)
5. Commit with clear, descriptive messages
6. Push to your fork and submit a pull request

### Code Style Guidelines

This project uses:
- **TypeScript** (server) and **JavaScript** (client) with strict linting
- **ESLint** for code quality
- **Prettier** for code formatting

Before submitting:

**Server:**
```bash
cd server
npm run lint
npm run prettier-check
npm run start  # Test build
```

**Client:**
```bash
cd client
npm run lint
npm run build  # Test build
```

### Coding Standards

#### General
1. Write clean, simple, readable code
2. Use clear, consistent naming
3. Keep files small and focused (<200 lines)
4. Test after every meaningful change
5. Add helpful explanatory comments (avoid obvious comments)

#### Server (TypeScript)
1. Use proper TypeScript types (avoid `any`)
2. Follow existing patterns for models, services, providers
3. Use Winston logger for all logging
4. Handle errors gracefully with CustomError class
5. Add JSDoc comments for complex functions

#### Client (JavaScript/React)
1. Use functional components and hooks
2. Follow existing patterns (custom hooks, models)
3. Keep components focused and reusable
4. Use PropTypes for prop validation
5. Maintain Tailwind CSS styling patterns

### Project Structure

#### Server (`/server`)
- `src/app.ts` - Application entry point
- `src/services/` - Business logic services
- `src/providers/` - Infrastructure providers (MongoDB, Socket.IO, Logger)
- `src/bl/` - Business layer (models, enums)
- `src/models/` - Local models
- `src/utils/` - Utility functions
- `config/` - Configuration files

#### Client (`/client`)
- `src/pages/` - Next.js pages
- `src/components/` - React components (pages/, common/)
- `src/hooks/` - Custom React hooks
- `src/models/` - Data models
- `src/providers/` - Providers (Socket.IO, Random)
- `src/config/` - Configuration files

### Adding New Features

#### Adding a New Pizza Stage
1. Add stage to `server/src/bl/enums/stage.enum.ts`
2. Update `server/src/config/constants.config.ts` with stage details
3. Update `RestaurantService.processStage()` logic if needed
4. Update client UI components to display new stage

#### Adding New Worker Types
1. Add worker to `server/src/bl/enums/worker.enum.ts`
2. Update stage configuration in constants
3. Update worker initialization in `RestaurantService.initiate()`

#### Modifying Real-time Events
1. Update socket event handlers in `server/src/providers/socketio.provider.ts`
2. Update client socket handlers in `client/src/hooks/usePizzaRestaurant.js`
3. Ensure event names match on both sides

### Testing Checklist

Before submitting a PR, test:
- [ ] Server starts successfully
- [ ] MongoDB connection works
- [ ] Socket.IO connection established
- [ ] Client can place orders
- [ ] Orders process through all stages
- [ ] Worker simulation works correctly
- [ ] Real-time updates display in UI
- [ ] Error handling works
- [ ] No console errors

### Dependencies

When adding dependencies:
- Use `npm install <package>` (not `npm i`)
- Add to appropriate package.json (server or client)
- Explain why the dependency is needed in PR description
- Ensure it doesn't conflict with existing packages

## Questions or Need Help?

Please feel free to contact me with any question, comment, pull-request, issue, or any other thing you have in mind.

* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

Thank you for contributing! 🙏

---
"submitjson": minor
---

## API enhancements

This release adds comprehensive support for the Submit JSON REST API, enabling you to programmatically manage your endpoints, projects, and submissions.

### ✨ New Features

**Secret Key Authentication**
- Added optional `secretKey` configuration parameter for secure server-side API access
- All new API methods require secret key authentication
- Fully backwards compatible - existing `submit()` functionality unchanged

**Endpoint Methods**
- `getEndpoints()` - Retrieve all endpoints with optional sorting
- `getEndpoint(slug)` - Get a single endpoint with integrations and origins
- `getEndpointSubmissions(slug, query?)` - Fetch paginated endpoint submissions

**Project Methods**
- `getProjects()` - Retrieve all projects with optional sorting
- `getProject(slug)` - Get a single project with endpoints and integrations
- `getProjectEndpoints(slug)` - List all endpoints in a project
- `getProjectSubmissions(slug, query?)` - Fetch paginated project submissions

**Submission Methods**
- `getSubmissions(query?)` - Retrieve all submissions with filtering
- `getSubmission(id)` - Get a single submission by ID

### 🔧 Breaking Changes

None - This release is fully backwards compatible.

### 📚 Documentation

See the updated [README](https://github.com/submitjson/submitjson-client#readme) for complete API documentation and examples.

**Requirements:**
- Secret key required for all new API methods (available in your [API settings](https://www.submitjson.com/account/api-keys))
- REST API access available on all paid plans

### 🔗 Related

- [REST API Documentation](https://api.submitjson.com/v1/docs)
- [Blog post: Secret key auth & REST API enhancements](https://www.submitjson.com/blog/api-enhancements)
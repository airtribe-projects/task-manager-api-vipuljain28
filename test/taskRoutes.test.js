const request = require('supertest');
const app = require('../app'); // Ensure the path to app.js is correct

describe('Task Routes', () => {
    let taskId;
    
    // Test: Create a new task
    it('should create a new task', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .send({
                title: 'Test Task',
                description: 'This is a test task',
                completed: false,
                priority: 'medium'
            });

        expect(response.status).toBe(201);
        expect(response.body.task).toHaveProperty('id');
        expect(response.body.task).toHaveProperty('title', 'Test Task');
        taskId = response.body.task.id; // Store the created task ID for later tests
    });

    // Test: Get all tasks
    it('should get all tasks', async () => {
        const response = await request(app).get('/api/tasks');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Test: Get a task by ID
    it('should get a task by ID', async () => {
        const response = await request(app).get(`/api/tasks/${taskId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', taskId);
        expect(response.body).toHaveProperty('title', 'Test Task');
    });

    // Test: Update a task
    it('should update a task', async () => {
        const response = await request(app)
            .put(`/api/tasks/${taskId}`)
            .send({
                title: 'Updated Test Task',
                description: 'This task has been updated',
                completed: true,
                priority: 'high'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Updated Test Task');
        expect(response.body).toHaveProperty('completed', true);
        expect(response.body).toHaveProperty('priority', 'high');
    });

    // Test: Delete a task
    it('should delete a task', async () => {
        const response = await request(app).delete(`/api/tasks/${taskId}`);

        expect(response.status).toBe(204);
    });

    // Test: Return 404 for a non-existent task
    it('should return 404 for a non-existent task', async () => {
        const response = await request(app).get(`/api/tasks/${taskId}`);

        expect(response.status).toBe(404);
    });

    // Test: Get tasks by priority
    it('should get tasks by priority', async () => {
        // Create a task with high priority
        await request(app)
            .post('/api/tasks')
            .send({
                title: 'High Priority Task',
                description: 'This is a high priority task',
                completed: false,
                priority: 'high'
            });

        const response = await request(app).get('/api/tasks/priority/high');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty('priority', 'high');
    });

    // Test: Get tasks with filtering
    // it('should get tasks with filtering', async () => {
    //     const response = await request(app).get('/api/tasks?completed=false');

    //     expect(response.status).toBe(200);
    //     expect(Array.isArray(response.body)).toBe(true);
    // });
});


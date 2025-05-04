
var currentId = 1;
var tasks = [];
exports.createTask = (req, res) => {
    // Logic for creating a task
    const { title, description, completed } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }  
    const newTask = {
        id: currentId++, // Simple ID generation for demonstration
        title,
        description,
        priority: req.body.priority || 'medium', // Default to 'medium' if not provided
        completed: completed || false,
    };
    // add task in in-memory datastorage
    tasks.push(newTask); // Assuming tasks is an array defined in the scope
    // add status message to response
    res.status(201).json({ message: 'Task created successfully', task: newTask });
    // add task in in-memory datastorage    
};

exports.getTasks = (req, res) => {
    // Logic for fetching all tasks
    res.status(200).json(tasks); // Assuming tasks is an array defined in the scope
    
};

exports.getTaskById = (req, res) => {
    // Logic for fetching a task by ID
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === taskId); // Assuming tasks is an array defined in the scope
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    } else {
        res.status(200).json(task); // Respond with the found task  
    }

};

exports.updateTask = (req, res) => {
    // Logic for updating a task
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === taskId); // Assuming tasks is an array defined in the scope
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    } else {
        const { title, description, completed,priority } = req.body;
        task.title = title??task.title;
        task.description = description??task.description;
        task.completed = completed??  task.completed;
        task.priority = priority??task.priority;
        res.status(200).json(task);
    }
};

exports.deleteTask = (req, res) => {
    // Logic for deleting a task
    const taskId = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex(t => t.id === taskId); // Assuming tasks is an array defined in the scope
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    } else {
        tasks.splice(taskIndex, 1);
        res.status(204).send();
    }
};
exports.getTasksByPriority = (req, res) => {
    // Logic for fetching tasks by priority level
    const priorityLevel = req.params.level;
    const filteredTasks = tasks.filter(task => task.priority === priorityLevel); // Assuming tasks is an array defined in the scope
    res.status(200).json(filteredTasks);
};
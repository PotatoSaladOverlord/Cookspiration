import { createServer, Model, Response } from 'miragejs';

export function makeServer() {
  return createServer({
    models: {
      user: Model,
      recipe: Model,
    },

    seeds(server) {
      server.db.loadData({
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123' },
        ],
        recipes: [
          {
            id: 1,
            title: 'Pâtes au pesto',
            ingredients: ['pâtes', 'pesto', 'parmesan'],
            instructions: 'Faire cuire les pâtes, ajouter le pesto et servir avec du parmesan.',
          },
        ],
      });
    },

    routes() {
      this.namespace = 'api';

      // User routes
      this.post('/signup', (schema, request) => {
        const user = JSON.parse(request.requestBody);
        schema.users.create(user);
        return { message: 'User signed up successfully!' };
      });

      this.post('/login', (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        const user = schema.users.findBy({ email, password });
        if (user) {
          return { message: 'Login successful!', user };
        } else {
          return new Response(401, {}, { error: 'Invalid email or password' });
        }
      });

      // Recipe routes
      this.get('/recipes', (schema) => schema.recipes.all());

      this.get('/recipes/:id', (schema, request) => {
        const id = request.params.id;
        return schema.recipes.find(id);
      });

      this.post('/recipes', (schema, request) => {
        const recipe = JSON.parse(request.requestBody);
        schema.recipes.create(recipe);
        return { message: 'Recipe created successfully!' };
      });

      this.get('/recipes/search', (schema, request) => {
        const ingredient = request.queryParams.ingredient;
        const recipes = schema.recipes.all().models.filter((recipe) =>
          recipe.ingredients.includes(ingredient)
        );
        return recipes;
      });
    },
  });
}

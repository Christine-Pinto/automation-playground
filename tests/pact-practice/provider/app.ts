import express, { Express } from 'express';

export interface Widget {
  id: string;
  name: string;
  inStock: boolean;
}

const widgets: Record<string, Widget> = {
  '1': { id: '1', name: 'Left-handed screwdriver', inStock: true },
  '2': { id: '2', name: 'Sky hook', inStock: false },
};

export function createApp(): Express {
  const app = express();

  app.get('/widgets/:id', (req, res) => {
    const widget = widgets[req.params.id];
    if (!widget) {
      res.status(404).json({ error: 'Widget not found' });
      return;
    }
    res.status(200).json(widget);
  });

  return app;
}

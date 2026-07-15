import axios from 'axios';
import { Widget } from '../provider/app';

export class WidgetClient {
  constructor(private readonly baseUrl: string) {}

  async getWidget(id: string): Promise<Widget> {
    const response = await axios.get<Widget>(`${this.baseUrl}/widgets/${id}`);
    return response.data;
  }
}

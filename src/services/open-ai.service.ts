import { Configuration, CreateImageRequestSizeEnum, OpenAIApi } from 'openai';
import { CreateCompletionRequest } from 'openai/api';

export const configuration = new Configuration({
  organization: process.env.REACT_APP_OPEN_AI_ORGANIZATION,
  apiKey: process.env.REACT_APP_OPEN_AI_KAY
});

delete configuration.baseOptions.headers['User-Agent'];

export const openai = new OpenAIApi(configuration);

export const creatAIImages = (prompt: string, n: number = 2, size: CreateImageRequestSizeEnum = '256x256') => {
  return openai.createImage({ prompt, n, size });
};

export const createAICompletion = (params: Omit<CreateCompletionRequest, 'model'>) => {
  return openai.createCompletion({ model: 'text-davinci-003', ...params });
};

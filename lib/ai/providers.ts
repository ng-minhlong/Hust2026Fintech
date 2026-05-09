
import { customProvider, gateway } from "ai";
import { isTestEnvironment, OnlyGroq } from "../constants";
import { titleModel } from "./models";

export const myProvider = isTestEnvironment
  ? (() => {
      const { chatModel, titleModel } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "title-model": titleModel,
        },
      });
    })()
  : null;


export function getLanguageModel(modelId: string) {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel(modelId);
  }
  return gateway.languageModel(modelId);
}


export function getTitleModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("title-model");
  }
  if (OnlyGroq) {
    return getLanguageModel(titleModel.id);
  }
  return gateway.languageModel(titleModel.id);
}

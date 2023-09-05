// this route file is handle the functions of create, update, delete.

// get (read)
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    // if not exists
    if (!prompt) return new Response("Prompt not found!", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};

// patch(update)
export const PATCH = async (request, { params }) => {
  // first getting the prompt data
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found!", { status: 404 });

    //   if we have prompt update it
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    // save is necessary
    await existingPrompt.save();
    // after that returning the values
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompts created by user", {
      status: 500,
    });
  }
};

// delete (delete)

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    // fetch the values first
    await Prompt.findByIdAndRemove(params.id);
    // if not here
    return new Response("Prompt Deleted successfully!", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompts created by user", {
      status: 500,
    });
  }
};

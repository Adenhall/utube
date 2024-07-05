import { Button, Field, Input, Label } from "@headlessui/react";
import { ActionFunction, Form, redirect } from "react-router-dom";

import { shareVideo } from "../services/video";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  await shareVideo(data.youtube_link as string);
  return redirect("/");
};

const Share = () => {
  return (
    <Form
      method="post"
      className="w-3/4 lg:w-1/2 mx-auto my-20 border border-gray-500 rounded-md px-10 pb-10"
    >
      <h1 className="text-2xl my-5">Share a Youtube video</h1>
      <Field>
        <Label className="mr-3">YouTube URL</Label>
        <Input
          className="w-full rounded-md border-0 py-1.5 pl-2 pr-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          name="youtube_link"
        />
      </Field>
      <Button
        type="submit"
        className="mt-4 w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Share
      </Button>
    </Form>
  );
};

export default Share;

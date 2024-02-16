test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
});

const SERVER_URL = "http://localhost:4000";

beforeEach(async () => {
  await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
})

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  // Code here
  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`);

  const getAllNotesBody = await getAllNotesRes.json();

  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesBody.response.length).toBe(0);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  // Code here
  const title1 = "Title1";
  const content1 = "Hello";

  const postNote1Res = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title1,
      content: content1,
    }),
  });

  const postNote1Body = await postNote1Res.json();

  expect(postNote1Res.status).toBe(200);
  expect(postNote1Body.response).toBe("Note added succesfully.");

  const title2 = "Title2";
  const content2 = "World";

  const postNote2Res = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title2,
      content: content2,
    }),
  });

  const postNote2Body = await postNote2Res.json();

  expect(postNote2Res.status).toBe(200);
  expect(postNote2Body.response).toBe("Note added succesfully.");

  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`);

  const getAllNotesBody = await getAllNotesRes.json();

  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesBody.response.length).toBe(2);
});

test("/deleteNote - Delete a note", async () => {
  // Code here
  const title = "Title";
  const content = "Hello";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const noteId = postNoteBody.insertedId;

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${noteId} deleted.`);
});

test("/patchNote - Patch with content and title", async () => {
  // Code here
  const title = "Title";
  const content = "Hello";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const noteId = postNoteBody.insertedId;
  const newTitle = "NewTitle";
  const newContent = "World";

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newTitle,
      content: newContent,
    }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);
});

test("/patchNote - Patch with just title", async () => {
  // Code here
  const title = "Title";
  const content = "Hello";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const noteId = postNoteBody.insertedId;
  const newTitle = "NewTitle";

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newTitle,
    }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);
});

test("/patchNote - Patch with just content", async () => {
  // Code here
  const title = "Title";
  const content = "Hello";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const noteId = postNoteBody.insertedId;
  const newContent = "World";

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: newContent,
    }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`);
});

test("/deleteAllNotes - Delete one note", async () => {
  // Code here
  const title = "Title";
  const content = "Hello";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const deleteAllNotesBody = await deleteAllNotesRes.json();

  expect(deleteAllNotesRes.status).toBe(200);
  expect(deleteAllNotesBody.response).toBe("1 note(s) deleted.");
});

test("/deleteAllNotes - Delete three notes", async () => {
  // Code here
  const title1 = "Title1";
  const content1 = "Hello";

  const postNote1Res = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title1,
      content: content1,
    }),
  });

  const postNote1Body = await postNote1Res.json();

  expect(postNote1Res.status).toBe(200);
  expect(postNote1Body.response).toBe("Note added succesfully.");

  const title2 = "Title2";
  const content2 = "There";

  const postNote2Res = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title2,
      content: content2,
    }),
  });

  const postNote2Body = await postNote2Res.json();

  expect(postNote2Res.status).toBe(200);
  expect(postNote2Body.response).toBe("Note added succesfully.");

  const title3 = "Title3";
  const content3 = "World!";

  const postNote3Res = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title3,
      content: content3,
    }),
  });

  const postNote3Body = await postNote3Res.json();

  expect(postNote3Res.status).toBe(200);
  expect(postNote3Body.response).toBe("Note added succesfully.");

  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const deleteAllNotesBody = await deleteAllNotesRes.json();

  expect(deleteAllNotesRes.status).toBe(200);
  expect(deleteAllNotesBody.response).toBe("3 note(s) deleted.");
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  // Code here
  const title = "Title";
  const content = "Hello";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");

  const noteId = postNoteBody.insertedId;
  const color = "#FF0000";

  const updateNoteColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ color }),
  });

  const updateNoteColorBody = await updateNoteColorRes.json();

  expect(updateNoteColorRes.status).toBe(200);
  expect(updateNoteColorBody.message).toBe("Note color updated successfully.");
});
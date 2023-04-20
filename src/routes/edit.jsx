import { 
  Form, 
  useLoaderData,
  redirect,
 } from "react-router-dom"
 import { updateContact } from "../contacts"

 export async function action({ request, params }) {
  const formData = await request.formData()
  const firstName = formData.get("first")
  const lastName = formData.get("last")
  const updates = Object.fromEntries(formData)
  updates.first; //"Some"
  updates.last; //"Name"
  await updateContact(params.contactId, updates)
  return redirect(`/contacts/${params.contactId}`)
 }

export default function EditContact() {
  const { contact } = useLoaderData()

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  )
}
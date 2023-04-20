import { 
  Form, 
  useLoaderData,
  useFetcher, } from "react-router-dom"
import { 
  getContact,
  updateContact } from "../contacts"

export async function action({ request, params }) { // gets fetcher.Form data prop
  let formData = await request.formData()
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true"
  })
}

export async function loader({ params }) {
  const contact = await getContact(params.contactId)
  if (!contact) { // throw 404 error instead of untitled error
    throw new Response("", {
      status: 404,
      statusText: "Contact Not Found",
    })
  }
  return { contact }
}

export default function Contact() {
  const { contact } = useLoaderData()
  // const contact = {
  //   first: "Your",
  //   last: "Name",
  //   avatar: "https://placekitten.com/g/200/200",
  //   twitter: "your_handle",
  //   notes: "Some notes",
  //   favorite: true,
  // }

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
          />
      </div>
      <div>
        <h1>
          {contact.first || contact.last? (
            <>
              {contact.first} {contact.last}
              </>
          ) : (
            <i>No Name</i>
          )}{""}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
              >
                {contact.twitter}
              </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) =>{
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault()
              }
            }}
            >
              <button type="submit">Delete</button>
            </Form>
        </div>
      </div>
    </div>
  )
}

function Favorite({ contact }) {
  const fetcher = useFetcher() // data mutations without navigation, useFetcher allows us to communicate with loaders and actions without causing a navigation, change the data on the page we're looking at.
  let favorite = contact.favorite
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true" // optimistic ui, updates the star's state, even though the network hasn't finished, if the update eventually fails, ui will revert to the real data. star immediately changes to the new state. instead of always rendering the actual data, we check if the fetcher has any 'formData' being submitted, if so, we'll use that instead. when action is done, the 'fetcher.formData' will no longer exist and we're back to using the actual data.
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
        >
          {favorite ?  "★" : "☆"}
        </button>
    </fetcher.Form>
  )
}
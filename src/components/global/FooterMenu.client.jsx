// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import {Disclosure} from '@headlessui/react';
import {Link} from '@shopify/hydrogen';

import {Heading, IconCaret} from '~/components';

import {useState} from 'react';
/**
 * A server component that specifies the content of the footer on the website
 */
export function FooterMenu({menu}) {
  const styles = {
    section: 'grid gap-4',
    nav: 'grid gap-2 pb-6',
  };

  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('form');
      const formData = new FormData(form);
    fetch('https://usebasin.com/f/f94575377d19', {
      method: 'POST',
        headers: {
        Accept: 'application/json',
      },
        body: formData,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("success");
        } else {
          console.log("fail");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      {(menu?.items || []).map((item) => (
        <section key={item.id} className={styles.section}>
          <Disclosure>
            {/* @ts-expect-error @headlessui/react incompatibility with node16 resolution */}
            {({open}) => (
              <>
                <h6>Subscribe to our NewsLetter</h6>
                <form id="form" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <button type="submit">Submit</button>
                </form>

                <Disclosure.Button className="text-left md:cursor-default">
                  <Heading className="flex justify-between" size="lead" as="h3">
                    {item.title}
                    {item?.items?.length > 0 && (
                      <span className="md:hidden">
                        <IconCaret direction={open ? 'up' : 'down'} />
                      </span>
                    )}
                  </Heading>
                </Disclosure.Button>
                {item?.items?.length > 0 && (
                  <div
                    className={`${
                      open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`
                    } overflow-hidden transition-all duration-300`}
                  >
                    <Disclosure.Panel static>
                      <nav className={styles.nav}>
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.id}
                            to={subItem.to}
                            target={subItem.target}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </nav>
                    </Disclosure.Panel>
                  </div>
                )}
              </>
            )}
          </Disclosure>
        </section>
      ))}{' '}
    </>
  );
}

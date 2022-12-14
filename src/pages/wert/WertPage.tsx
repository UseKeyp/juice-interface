import WertModule from '@wert-io/module-react-component'
import Icon from '../addfunds/Icon'

const WertPage = () => {
  const address = new URL(location.href).searchParams.get('address')
  const email = new URL(location.href).searchParams.get('email')

  return (
    <>
      <div className="chess-background flex h-screen w-full items-center justify-center">
        <div className="w-full sm:w-[400px]">
          <div className="wert-container w-full sm:w-[400px]">
            <div className="flex h-[60px] items-center justify-center">
              <Icon name="wert" color="white" />
            </div>
            {address && (
              <WertModule
                options={{
                  origin:
                    process.env.NODE_ENV === 'development'
                      ? 'https://sandbox.wert.io'
                      : 'https://widget.wert.io',
                  partner_id:
                    process.env.NODE_ENV === 'development'
                      ? '01G5FDZZ2RY85QT8WY7AMN95P5'
                      : '01G6BAFZZKJW8SN5P3FRCKGDHV',
                  container_id: 'wert',
                  // width: 400,
                  height: 550,
                  currency: 'USD',
                  // currency_amount: 100,
                  // commodity_amount: 5;
                  commodity:
                    process.env.NODE_ENV === 'development'
                      ? 'ETH'
                      : 'ETH:ethereum',
                  commodities:
                    process.env.NODE_ENV === 'development'
                      ? 'ETH'
                      : 'ETH:ethereum',
                  address,
                  email,
                  redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}redirect/wert`,
                  extra: {
                    item_info: {
                      author_image_url:
                        'https://usekeyp.com/lib_EuhSXxjdIHnRGpWc/1losb3su6g1bq058.svg?w=224',
                      author: 'Keyp',
                      image_url:
                        'https://usekeyp.com/lib_EuhSXxjdIHnRGpWc/1losb3su6g1bq058.svg?w=224',
                      name: 'String',
                      seller: 'Keyp',
                    },
                  },
                  listeners: {},
                  // theme: 'dark',
                  color_background: '#4f4f4f',
                  color_buttons: '#125BF5',
                  color_buttons_text: '#fff',
                  color_secondary_buttons: '#272522',
                  color_secondary_buttons_text: '#fff',
                  color_main_text: '#fff',
                  color_secondary_text: '#ABB6B9',
                  color_icons: '#fff',
                  color_links: '#147DDD',
                  color_success: '#88C54B',
                  color_warning: '#FFBB0D',
                  color_error: '#FFBB0D',
                }}
              />
            )}
          </div>
          <div className="flex h-[50px] items-center justify-center">
            <p>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://support.wert.io/en/collections/2862595-help-centre"
              >
                Wert Customer Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default WertPage

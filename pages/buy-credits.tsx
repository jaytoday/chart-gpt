import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Card, Icon, Metric, Subtitle, Title } from '@tremor/react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Script from 'next/script';
import useSWR from 'swr';
import { Slider } from '../components/ui/slider';

const StripePublishableKey =
  'pk_live_51N4hjKKeboA3fgq8Ha08TqSvG1srWppQol3plyCk6T54RdqHRbRWqEuUUEiaf3a6fZnwdg7n8MtfRlBpH4yJPCEV00EhvjJViA';

const BuyButtons = [
  {
    numberOfCredits: 20,
    'buy-button-id': 'buy_btn_1N6w8TKeboA3fgq8VYrf8GXN',
  },
  { numberOfCredits: 100, 'buy-button-id': 'buy_btn_1N6wCmKeboA3fgq8zdo6zR7k' },
  { numberOfCredits: 250, 'buy-button-id': 'buy_btn_1N6wEtKeboA3fgq8TYlPDGEd' },
  { numberOfCredits: 750, 'buy-button-id': 'buy_btn_1N6wFsKeboA3fgq8yI28HkJv' },
];

export default function Pricing() {
  const { data: session } = useSession();

  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data } = useSWR('/api/remaining', fetcher);

  return (
    <div className="flex mx-auto max-w-7xl overflow-visible flex-col items-center justify-center">
      <Head>
        <title>Buy ChartGPT Credits</title>
      </Head>
      <Script src="https://cdn.paritydeals.com/banner.js" />
      <Script async src="https://js.stripe.com/v3/buy-button.js" />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4">
        <h1 className="mx-auto max-w-4xl text-center text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
          Buy ChartGPT Credits
        </h1>
        <Title className="text-zinc-500 dark:text-zinc-400 font-normal mt-6">
          You currently have{' '}
          <span className="font-semibold text-zinc-900 dark:text-white">
            {data?.remainingGenerations}{' '}
            {data?.remainingGenerations > 1 || data?.remainingGenerations === 0
              ? 'credits'
              : 'credit'}
          </span>
          . Purchase more below.
        </Title>
      </main>

      <Title className="dark:text-zinc-200 my-6">
        How many Chart Generations do you need?
      </Title>
      <div>
        <div className="flex items-baseline space-x-2">
          <Metric className="dark:text-zinc-100">20 credits</Metric>
          <Subtitle className="dark:text-zinc-400">
            20 chart generations
          </Subtitle>
        </div>
        <Slider
          defaultValue={[100]}
          min={20}
          max={750}
          step={10}
          className="max-w-[288px] my-6"
        />
        {/* TODO: Handle the scenario of logged out, need to prompt to sign in */}
        {session && (
          <stripe-buy-button
            buy-button-id="buy_btn_1N6w8TKeboA3fgq8VYrf8GXN"
            publishable-key="pk_live_51N4hjKKeboA3fgq8Ha08TqSvG1srWppQol3plyCk6T54RdqHRbRWqEuUUEiaf3a6fZnwdg7n8MtfRlBpH4yJPCEV00EhvjJViA"
          />
        )}
      </div>

      <Card className="max-w-[400px] dark:bg-black dark:ring-zinc-800 mt-16">
        <Title className="dark:text-white">What’s included?</Title>
        <ul className="space-y-2 mt-3">
          <li>
            <Icon
              icon={CheckCircleIcon}
              variant="light"
              size="xs"
              color="emerald"
              className="mr-2 dark:bg-emerald-300/20"
            />
            <span className="text-zinc-600 dark:text-zinc-400 dark:text-zinc text-base font-normal">
              Open source interface
            </span>
          </li>
          <li>
            <Icon
              icon={CheckCircleIcon}
              variant="light"
              size="xs"
              color="emerald"
              className="mr-2 dark:bg-emerald-300/20"
            />
            <span className="text-zinc-600 dark:text-zinc-400 dark:text-zinc text-base font-normal">
              .PNG download
            </span>
          </li>
          <li>
            <Icon
              icon={CheckCircleIcon}
              variant="light"
              size="xs"
              color="emerald"
              className="mr-2 dark:bg-emerald-300/20"
            />
            <span className="text-zinc-600 dark:text-zinc-400 dark:text-zinc text-base font-normal">
              PowerPoint exports
            </span>
            <span className="ml-1 text-zinc-400 dark:text-zinc-500 text-base font-normal italic">
              (coming soon)
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}

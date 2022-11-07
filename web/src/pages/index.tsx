import Image from 'next/image';
import { FormEvent, useState } from 'react';
import appPreviewImage from '../assets/app-preview.svg';
import userAvatars from '../assets/avatarExample.svg';
import checkIcon from '../assets/checkIcon.svg';
import logoImage from '../assets/logo.svg';
import { api } from '../lib/axios';

interface HomeProps {
  poolsCount: number;
  guessesCount: number;
  usersCount: number;
}

export default function Home({
  poolsCount,
  guessesCount,
  usersCount,
}: HomeProps) {
  const [poolTitle, setPoolTitle] = useState<string>('');
  const handleCreatePool = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post('/pools', {
        title: poolTitle,
      });
      const { code } = response.data;
      navigator.clipboard.writeText(code);
      alert('Copied to clipboard!');
      setPoolTitle('');
    } catch (error) {
      console.log(error);
      alert('Erro ao criar pool');
    }

    console.log('create pool');
  };
  return (
    <div className="max-w-[1024px] h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main>
        <Image src={logoImage} alt="NLW Copa logo" />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Create your own cup pool and share it with
          friends!
        </h1>
        <div className="mt-10 flex items-center gap-2 ">
          <Image
            src={userAvatars}
            alt="User avatars"
            quality={100}
          />
          <strong className="text-gray-100 text-xl">
            <span className="text-green-500">
              +{usersCount}
            </span>{' '}
            people are already using it
          </strong>
        </div>
        <form
          className="mt-10 flex gap-2"
          onSubmit={handleCreatePool}
        >
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            placeholder="Enter your pool name"
            required
            onChange={(event) =>
              setPoolTitle(event.target.value)
            }
            value={poolTitle}
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
            type="submit"
          >
            Create pool
          </button>
        </form>

        <p className="text-gray-300 mt-4 text-sm leading-relaxed">
          After creating your pool, you will receive a
          unique code that you can use to invite others 🚀
        </p>
        <div className="mt-10 pt-10 border-t border-gray-600 flex flex-row text-gray-100 items-center justify-between">
          <div className="flex items-center gap-6">
            <Image src={checkIcon} alt="Check icon" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">
                +{poolsCount}
              </span>
              <p>Pools created</p>
            </div>
          </div>
          <div className="w-px h-14 bg-gray-600" />
          <div className="flex items-center gap-6">
            <Image src={checkIcon} alt="Check icon" />
            <div>
              <span className="font-bold text-2xl">
                +{guessesCount}
              </span>
              <p>Guesses sent</p>
            </div>
          </div>
        </div>
      </main>
      <Image
        src={appPreviewImage}
        alt="two mobiles displaying the app"
        quality={100}
      />
    </div>
  );
}

// // api called indexed by google
// export const getServerSideProps = async () => {
//   const [
//     poolsCountResponse,
//     guessesCountResponse,
//     usersCountResponse,
//   ] = await Promise.all([
//     api.get('/pools/count'),
//     api.get('/guesses/count'),
//     api.get('/users/count'),
//   ]);

//   return {
//     props: {
//       poolsCount: poolsCountResponse.data.count,
//       guessesCount: guessesCountResponse.data.count,
//       usersCount: usersCountResponse.data.count,
//     },
//   };
// };

// challenge to get the data from the api and show it on the page revalidate: 30 minutes
export const getStaticProps = async () => {
  const [
    poolsCountResponse,
    guessesCountResponse,
    usersCountResponse,
  ] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count'),
  ]);

  return {
    props: {
      poolsCount: poolsCountResponse.data.count,
      guessesCount: guessesCountResponse.data.count,
      usersCount: usersCountResponse.data.count,
    },
    revalidate: 30 * 60, // 30 minutes
  };
};

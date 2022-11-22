/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { formatDate } from '../../../utils';
import { RpcApi } from '../../rpc-client';
import { DeployStatus } from '../../types';

export const mintCopies = async () => {
  const dateTime = new Date();
  const dateTimeString = dateTime.toString();

  const mockDeployHash =
    '4c1b76a088b734a18c1c95ffbe2066818d231c3a164a4bc6672eaa3770b5efc2';
  const mockBlockHash =
    'd12535df477bab2404df0d3f5ff083e4cdd891e645a672028c128a9e5d14139f';
  const mockPublicKey =
    '0203a810758f6a796c8648a836c519c7f62d4b364d7a711d1c0f3f9d6f8138c59f49';

  const mockRawDeploy = {
    hash: mockDeployHash,
    header: {
      ttl: '30m',
      account:
        '0203a810758f6a796c8648a836c519c7f62d4b364d7a711d1c0f3f9d6f8138c59f49',
      body_hash:
        '512686c320c74f4409d995978e083d9a6d8284064530e062301c67d1c622fcd9',
      gas_price: 1,
      timestamp: dateTimeString,
      chain_name: 'casper-test',
      dependencies: [],
    },
    payment: {
      ModuleBytes: {
        args: [
          [
            'amount',
            {
              bytes: '05806e877401',
              parsed: '6250000000',
              cl_type: 'U512',
            },
          ],
        ],
        module_bytes: '',
      },
    },
    session: {
      StoredContractByHash: {
        args: [
          [
            'count',
            {
              bytes: '05000000',
              parsed: 5,
              cl_type: 'U32',
            },
          ],
          [
            'recipient',
            {
              bytes:
                '00908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb',
              parsed: {
                Account:
                  'account-hash-908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb',
              },
              cl_type: 'Key',
            },
          ],
          [
            'token_ids',
            {
              bytes:
                '0105000000340000007a627974652d63657034372d6e66742d33383264636639362d363163382d343832622d623236382d623231326364666466373166340000007a627974652d63657034372d6e66742d34323136626536322d363531382d346633342d393766372d393463353537303037646533340000007a627974652d63657034372d6e66742d30366338343434322d656134612d346139342d383932372d353635396134653339373132340000007a627974652d63657034372d6e66742d39646134663635632d323931332d346365342d396435332d663336653561363564643331340000007a627974652d63657034372d6e66742d36386136336637342d303236372d346635332d383439392d356434353330373331316637',
              parsed: [
                'zbyte-cep47-nft-382dcf96-61c8-482b-b268-b212cdfdf71f',
                'zbyte-cep47-nft-4216be62-6518-4f34-97f7-94c557007de3',
                'zbyte-cep47-nft-06c84442-ea4a-4a94-8927-5659a4e39712',
                'zbyte-cep47-nft-9da4f65c-2913-4ce4-9d53-f36e5a65dd31',
                'zbyte-cep47-nft-68a63f74-0267-4f53-8499-5d45307311f7',
              ],
              cl_type: {
                Option: {
                  List: 'String',
                },
              },
            },
          ],
          [
            'token_meta',
            {
              bytes:
                '03000000040000006e616d650b000000476f6c67656e20474174650b0000006465736372697074696f6e0300000053464f05000000696d6167655000000068747470733a2f2f697066732e696f2f697066732f6261666b72656965366d7567687a6e6a71756b66786772636878693633646a6c707234723462617676763770666173627869636b74337864687671',
              parsed: [
                {
                  key: 'name',
                  value: 'Golgen GAte',
                },
                {
                  key: 'description',
                  value: 'SFO',
                },
                {
                  key: 'image',
                  value:
                    'https://ipfs.io/ipfs/bafkreie6mughznjqukfxgrchxi63djlpr4r4bavvv7pfasbxickt3xdhvq',
                },
              ],
              cl_type: {
                Map: {
                  key: 'String',
                  value: 'String',
                },
              },
            },
          ],
        ],
        hash: '69106fcd2191bca4f21d3939f83e69acd411f71bdf5196654e5f0afd0ca1cd3f',
        entry_point: 'mint_copies',
      },
    },
  };

  const mockRawExecutionResults = [
    {
      block_hash: mockBlockHash,
      result: {
        Success: {
          cost: '4282154840',
          effect: {
            operations: [],
            transforms: [
              {
                key: 'hash-8cf5e4acf51f54eb59291599187838dc3bc234089c46fc6ca8ad17e762ae4401',
                transform: 'Identity',
              },
              {
                key: 'hash-624dbe2395b9d9503fbee82162f1714ebff6b639f96d2084d26d944c354ec4c5',
                transform: 'Identity',
              },
              {
                key: 'hash-010c3fe81b7b862e50c77ef9a958a05bfa98444f26f96f23d37a13c96244cfb7',
                transform: 'Identity',
              },
              {
                key: 'hash-9824d60dc3a5c44a20b9fd260a412437933835b52fc683d8ae36e4ec2114843e',
                transform: 'Identity',
              },
              {
                key: 'balance-b9a5f8d574aa06a6fc23be18a1b7acec5204e3e73850073b7bc65eba91d02326',
                transform: 'Identity',
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: 'Identity',
              },
              {
                key: 'balance-b9a5f8d574aa06a6fc23be18a1b7acec5204e3e73850073b7bc65eba91d02326',
                transform: {
                  WriteCLValue: {
                    bytes: '06800c7c0ec32a',
                    parsed: '47017250000000',
                    cl_type: 'U512',
                  },
                },
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: {
                  AddUInt512: '6250000000',
                },
              },
              {
                key: 'hash-69106fcd2191bca4f21d3939f83e69acd411f71bdf5196654e5f0afd0ca1cd3f',
                transform: 'Identity',
              },
              {
                key: 'hash-07f325378c0ad7222cc084d2dc82fc289157ef2925099d56b61556702a69adf2',
                transform: 'Identity',
              },
              {
                key: 'hash-0c6666d7dafac7b8b4b5e9b805d194309e079a420535c65cf6df9419606cbcd7',
                transform: 'Identity',
              },
              {
                key: 'dictionary-c05a1b4d65c13e206e7fa130846f0bfcc019fd2f1d536fcf788e7cce8c344d23',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '8f00000001030000000b0000006465736372697074696f6e0300000053464f05000000696d6167655000000068747470733a2f2f697066732e696f2f697066732f6261666b72656965366d7567687a6e6a71756b66786772636878693633646a6c707234723462617676763770666173627869636b74337864687671040000006e616d650b000000476f6c67656e20474174650d110a0a20000000b3d4d0a44edd148509c4316f7910cf2f49578016def3dd2e63e3300ee164a08a340000007a627974652d63657034372d6e66742d33383264636639362d363163382d343832622d623236382d623231326364666466373166',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-fff502623df07dc0baef6e9109e62caf1f67e6830639ced462e9ece4e724ff1b',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '220000000100908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb0d0b200000002a7ef02f70d8d215a53b7fdaad10a2fadef99f283b099b92b619a47ce40316d2340000007a627974652d63657034372d6e66742d33383264636639362d363163382d343832622d623236382d623231326364666466373166',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-77892c29e1d0af55fe5a147526d89d1ce81d96cbb6b90235ff134aed1dc762dc',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '220000000100908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb0d0b200000006c5f3cff580541d225dc167400f0b376269109d0205afe6643a8eefab1400dd3340000007a627974652d63657034372d6e66742d33383264636639362d363163382d343832622d623236382d623231326364666466373166',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-d32621d6045b76f255c0a17ff1bf73d9342efac76792181627dd6916ac3cc19f',
                transform: 'Identity',
              },
              {
                key: 'dictionary-7de7eed3ae661d551adc72c772eba178d31641ba76bf0891cd0121237a897c24',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '04000000010241040d0720000000f3cc15e280d134cf300db7281b649eb24f48387adc0e51f7186db96d025dded74000000066643865346236346334633035633234373064356330303262323966646135363639353134316535653630636136323861376432633733323564636133363530',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-56de81675386068feb8d496ff0d2a2c94913642dbbada2562a1a377e7dfe6fc4',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '3900000001340000007a627974652d63657034372d6e66742d33383264636639362d363163382d343832622d623236382d6232313263646664663731660d0a200000007f92c8a8b5ec1fd674d00cb27549baa8dd6fe8592c171bb24a89d06759d92c934000000036366665653761336131323263316437363464336531643139353866336436636330326263343232396333613037323434666539313935626636653932626364',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-d32621d6045b76f255c0a17ff1bf73d9342efac76792181627dd6916ac3cc19f',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '04000000010242040d0720000000e5309685a8de30bbeff2ae44c7afec01b8b7083e871248cd9ebc5f24cc8d3a364000000039303839373931353761623262383638353332646433396437303136663333633036363536383435396132646633383538363865386238336337666161326562',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-79d811f91f8d1a67397a74cc07a150346e8bfc8e9170d78ab1975e70c86e85f0',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '8f00000001030000000b0000006465736372697074696f6e0300000053464f05000000696d6167655000000068747470733a2f2f697066732e696f2f697066732f6261666b72656965366d7567687a6e6a71756b66786772636878693633646a6c707234723462617676763770666173627869636b74337864687671040000006e616d650b000000476f6c67656e20474174650d110a0a20000000b3d4d0a44edd148509c4316f7910cf2f49578016def3dd2e63e3300ee164a08a340000007a627974652d63657034372d6e66742d34323136626536322d363531382d346633342d393766372d393463353537303037646533',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-d01e39019ed30ba244255b80a4fd29ffe211e3af9941d9910492f2b39d1b67db',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '220000000100908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb0d0b200000002a7ef02f70d8d215a53b7fdaad10a2fadef99f283b099b92b619a47ce40316d2340000007a627974652d63657034372d6e66742d34323136626536322d363531382d346633342d393766372d393463353537303037646533',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-3dc44770e43fd14e1f22296b380cdecb1930e0ae109f18766367ca91161e8939',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '220000000100908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb0d0b200000006c5f3cff580541d225dc167400f0b376269109d0205afe6643a8eefab1400dd3340000007a627974652d63657034372d6e66742d34323136626536322d363531382d346633342d393766372d393463353537303037646533',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-d32621d6045b76f255c0a17ff1bf73d9342efac76792181627dd6916ac3cc19f',
                transform: 'Identity',
              },
              {
                key: 'dictionary-5606c3ca1b877782c09d685b7f448cd7c4f0e01eebee20a55500bdcdd4048f9b',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '04000000010242040d0720000000f3cc15e280d134cf300db7281b649eb24f48387adc0e51f7186db96d025dded74000000032343233643464643334303963396262353836613234333830663137633139616564623335313537646136663731303636363630613961353866376436623732',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-e2acb9856c5e4bb988b2349c05edd1c5aed0867987f6550a29f36d237f3af175',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '3900000001340000007a627974652d63657034372d6e66742d34323136626536322d363531382d346633342d393766372d3934633535373030376465330d0a200000007f92c8a8b5ec1fd674d00cb27549baa8dd6fe8592c171bb24a89d06759d92c934000000037646437616365623331343662323063313739633832376435636335613433306133633834613563626164396261653564306666336664323731336465653037',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-d32621d6045b76f255c0a17ff1bf73d9342efac76792181627dd6916ac3cc19f',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '04000000010243040d0720000000e5309685a8de30bbeff2ae44c7afec01b8b7083e871248cd9ebc5f24cc8d3a364000000039303839373931353761623262383638353332646433396437303136663333633036363536383435396132646633383538363865386238336337666161326562',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-1e190acbb5530fdf810c734d6cc996861f7fe9da58573c682576d8316cbf8915',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '8f00000001030000000b0000006465736372697074696f6e0300000053464f05000000696d6167655000000068747470733a2f2f697066732e696f2f697066732f6261666b72656965366d7567687a6e6a71756b66786772636878693633646a6c707234723462617676763770666173627869636b74337864687671040000006e616d650b000000476f6c67656e20474174650d110a0a20000000b3d4d0a44edd148509c4316f7910cf2f49578016def3dd2e63e3300ee164a08a340000007a627974652d63657034372d6e66742d30366338343434322d656134612d346139342d383932372d353635396134653339373132',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-49c2e8cc92fa92737a2daa16bc90d2795c2d3122d8a77bdc1ab54f9326b1fb6f',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '220000000100908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb0d0b200000002a7ef02f70d8d215a53b7fdaad10a2fadef99f283b099b92b619a47ce40316d2340000007a627974652d63657034372d6e66742d30366338343434322d656134612d346139342d383932372d353635396134653339373132',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-213d0362c38acfb6218b84e05469bba3afc32b3d6705bd47b114b6729bdd9557',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '220000000100908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb0d0b200000006c5f3cff580541d225dc167400f0b376269109d0205afe6643a8eefab1400dd3340000007a627974652d63657034372d6e66742d30366338343434322d656134612d346139342d383932372d353635396134653339373132',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-d32621d6045b76f255c0a17ff1bf73d9342efac76792181627dd6916ac3cc19f',
                transform: 'Identity',
              },
              {
                key: 'dictionary-f65152b379bf1c3c13d1a5533755e201cc45d8a8fde4de2d980d0e50f4c32a5d',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '04000000010243040d0720000000f3cc15e280d134cf300db7281b649eb24f48387adc0e51f7186db96d025dded74000000037326333363030343062306461663234373430623065356530633139663830623565373966346330323464383339313738643561356362366432333139643132',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-a5bf78e7952a291914c5068917063d51238f672e0d3853c2f87ebdfc4eab96e5',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '3900000001340000007a627974652d63657034372d6e66742d30366338343434322d656134612d346139342d383932372d3536353961346533393731320d0a200000007f92c8a8b5ec1fd674d00cb27549baa8dd6fe8592c171bb24a89d06759d92c934000000036326438363132323261383263303932323561313036353861326437363733303930303962626662623333386463366438653266356230313362613739656234',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-d32621d6045b76f255c0a17ff1bf73d9342efac76792181627dd6916ac3cc19f',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '04000000010244040d0720000000e5309685a8de30bbeff2ae44c7afec01b8b7083e871248cd9ebc5f24cc8d3a364000000039303839373931353761623262383638353332646433396437303136663333633036363536383435396132646633383538363865386238336337666161326562',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-f3cab64b6f23fde2346ccc459abf54acd396b3945227568bdf3459c4ae24094b',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '8f00000001030000000b0000006465736372697074696f6e0300000053464f05000000696d6167655000000068747470733a2f2f697066732e696f2f697066732f6261666b72656965366d7567687a6e6a71756b66786772636878693633646a6c707234723462617676763770666173627869636b74337864687671040000006e616d650b000000476f6c67656e20474174650d110a0a20000000b3d4d0a44edd148509c4316f7910cf2f49578016def3dd2e63e3300ee164a08a340000007a627974652d63657034372d6e66742d39646134663635632d323931332d346365342d396435332d663336653561363564643331',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-2212689b7a647663fa42908cff50df21bb00a7cc3ca568d69317ae856760bf2b',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '220000000100908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb0d0b200000002a7ef02f70d8d215a53b7fdaad10a2fadef99f283b099b92b619a47ce40316d2340000007a627974652d63657034372d6e66742d39646134663635632d323931332d346365342d396435332d663336653561363564643331',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-9c2d144a83ecda1ebe83119088c00d9066d8594d1f7e30751b972b97ee06212f',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '220000000100908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb0d0b200000006c5f3cff580541d225dc167400f0b376269109d0205afe6643a8eefab1400dd3340000007a627974652d63657034372d6e66742d39646134663635632d323931332d346365342d396435332d663336653561363564643331',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-d32621d6045b76f255c0a17ff1bf73d9342efac76792181627dd6916ac3cc19f',
                transform: 'Identity',
              },
              {
                key: 'dictionary-25b2cb24d795d3f0265066e294c68bf59d069655e337394bc3c5807b2bdaf963',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '04000000010244040d0720000000f3cc15e280d134cf300db7281b649eb24f48387adc0e51f7186db96d025dded74000000062663336333561666236313262353737303737393332626463353265383464313865613261333263653636663761643761363762313238393666363239386337',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-cde021027dbfafdfcdb62a2df0040c61ffa6a69e09c0d83db8b3116742c756dc',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '3900000001340000007a627974652d63657034372d6e66742d39646134663635632d323931332d346365342d396435332d6633366535613635646433310d0a200000007f92c8a8b5ec1fd674d00cb27549baa8dd6fe8592c171bb24a89d06759d92c934000000064646132303639663162353962393264386661336339343235383337363530386435376364353562313661356235643362643566373261343032383965313134',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-d32621d6045b76f255c0a17ff1bf73d9342efac76792181627dd6916ac3cc19f',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '04000000010245040d0720000000e5309685a8de30bbeff2ae44c7afec01b8b7083e871248cd9ebc5f24cc8d3a364000000039303839373931353761623262383638353332646433396437303136663333633036363536383435396132646633383538363865386238336337666161326562',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-a04b56f8dc9245de5396c085ce27585b1bcb58b57e97735162d1d2845fbc4a24',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '8f00000001030000000b0000006465736372697074696f6e0300000053464f05000000696d6167655000000068747470733a2f2f697066732e696f2f697066732f6261666b72656965366d7567687a6e6a71756b66786772636878693633646a6c707234723462617676763770666173627869636b74337864687671040000006e616d650b000000476f6c67656e20474174650d110a0a20000000b3d4d0a44edd148509c4316f7910cf2f49578016def3dd2e63e3300ee164a08a340000007a627974652d63657034372d6e66742d36386136336637342d303236372d346635332d383439392d356434353330373331316637',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-746c39964423cba13fa01b153b08e8589679fb0bb6f985e42ac755a152d03b80',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '220000000100908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb0d0b200000002a7ef02f70d8d215a53b7fdaad10a2fadef99f283b099b92b619a47ce40316d2340000007a627974652d63657034372d6e66742d36386136336637342d303236372d346635332d383439392d356434353330373331316637',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-583eafab76d6f585e3f4c62cf5f2e1035fdaf2098e1e031889782a025b2506e0',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '220000000100908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb0d0b200000006c5f3cff580541d225dc167400f0b376269109d0205afe6643a8eefab1400dd3340000007a627974652d63657034372d6e66742d36386136336637342d303236372d346635332d383439392d356434353330373331316637',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-d32621d6045b76f255c0a17ff1bf73d9342efac76792181627dd6916ac3cc19f',
                transform: 'Identity',
              },
              {
                key: 'dictionary-867cf1900a18dc183dc4f487b1d3d27a417b37d74b67257562bc8db23405b9c9',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '04000000010245040d0720000000f3cc15e280d134cf300db7281b649eb24f48387adc0e51f7186db96d025dded74000000061303264613631626534313036393030353863626133363664336237333838616339663637663635313365636463663238613030363961376132373638316532',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-97da2368b51a6c5f06ce3d40b888aaf56858f9fa0b08e39e77e435f83c8d6658',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '3900000001340000007a627974652d63657034372d6e66742d36386136336637342d303236372d346635332d383439392d3564343533303733313166370d0a200000007f92c8a8b5ec1fd674d00cb27549baa8dd6fe8592c171bb24a89d06759d92c934000000038363863313866316639613632333764306134326562646662663163376533323266323931643936363738633866303734316134646565333864663837373537',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'dictionary-d32621d6045b76f255c0a17ff1bf73d9342efac76792181627dd6916ac3cc19f',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '04000000010246040d0720000000e5309685a8de30bbeff2ae44c7afec01b8b7083e871248cd9ebc5f24cc8d3a364000000039303839373931353761623262383638353332646433396437303136663333633036363536383435396132646633383538363865386238336337666161326562',
                    parsed: null,
                    cl_type: 'Any',
                  },
                },
              },
              {
                key: 'uref-d503a315e08c51cc801d2dae0d750c18c80e92b895115f25a3d049df8c290493-000',
                transform: 'Identity',
              },
              {
                key: 'uref-d503a315e08c51cc801d2dae0d750c18c80e92b895115f25a3d049df8c290493-000',
                transform: {
                  WriteCLValue: {
                    bytes: '020905',
                    parsed: '1289',
                    cl_type: 'U256',
                  },
                },
              },
              {
                key: 'uref-080d027d8a0f043ca1ca1dfbfb7eff68a6c6ba92751fbd0c370c52d7fe639b3a-000',
                transform: 'Identity',
              },
              {
                key: 'uref-6edbaedb25116d0adc5ac64d9046502331b133f84898c9e4bc1c724f38c0c83f-000',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '0400000015000000636f6e74726163745f7061636b6167655f6861736840000000303766333235333738633061643732323263633038346432646338326663323839313537656632393235303939643536623631353536373032613639616466320a0000006576656e745f747970650e00000063657034375f6d696e745f6f6e6509000000726563697069656e744e0000004b65793a3a4163636f756e7428393038393739313537616232623836383533326464333964373031366633336330363635363834353961326466333835383638653862383363376661613265622908000000746f6b656e5f6964340000007a627974652d63657034372d6e66742d33383264636639362d363163382d343832622d623236382d623231326364666466373166',
                    parsed: [
                      {
                        key: 'contract_package_hash',
                        value:
                          '07f325378c0ad7222cc084d2dc82fc289157ef2925099d56b61556702a69adf2',
                      },
                      {
                        key: 'event_type',
                        value: 'cep47_mint_one',
                      },
                      {
                        key: 'recipient',
                        value:
                          'Key::Account(908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb)',
                      },
                      {
                        key: 'token_id',
                        value:
                          'zbyte-cep47-nft-382dcf96-61c8-482b-b268-b212cdfdf71f',
                      },
                    ],
                    cl_type: {
                      Map: {
                        key: 'String',
                        value: 'String',
                      },
                    },
                  },
                },
              },
              {
                key: 'uref-dabd5db8ef9c71325a674f8fbbadcdb1f3e2927ff865bda540530c14c4f93718-000',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '0400000015000000636f6e74726163745f7061636b6167655f6861736840000000303766333235333738633061643732323263633038346432646338326663323839313537656632393235303939643536623631353536373032613639616466320a0000006576656e745f747970650e00000063657034375f6d696e745f6f6e6509000000726563697069656e744e0000004b65793a3a4163636f756e7428393038393739313537616232623836383533326464333964373031366633336330363635363834353961326466333835383638653862383363376661613265622908000000746f6b656e5f6964340000007a627974652d63657034372d6e66742d34323136626536322d363531382d346633342d393766372d393463353537303037646533',
                    parsed: [
                      {
                        key: 'contract_package_hash',
                        value:
                          '07f325378c0ad7222cc084d2dc82fc289157ef2925099d56b61556702a69adf2',
                      },
                      {
                        key: 'event_type',
                        value: 'cep47_mint_one',
                      },
                      {
                        key: 'recipient',
                        value:
                          'Key::Account(908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb)',
                      },
                      {
                        key: 'token_id',
                        value:
                          'zbyte-cep47-nft-4216be62-6518-4f34-97f7-94c557007de3',
                      },
                    ],
                    cl_type: {
                      Map: {
                        key: 'String',
                        value: 'String',
                      },
                    },
                  },
                },
              },
              {
                key: 'uref-3fddb6b1cce6c8a0af337f70a07e1a305144aef100e099ac7985aff1a1353da1-000',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '0400000015000000636f6e74726163745f7061636b6167655f6861736840000000303766333235333738633061643732323263633038346432646338326663323839313537656632393235303939643536623631353536373032613639616466320a0000006576656e745f747970650e00000063657034375f6d696e745f6f6e6509000000726563697069656e744e0000004b65793a3a4163636f756e7428393038393739313537616232623836383533326464333964373031366633336330363635363834353961326466333835383638653862383363376661613265622908000000746f6b656e5f6964340000007a627974652d63657034372d6e66742d30366338343434322d656134612d346139342d383932372d353635396134653339373132',
                    parsed: [
                      {
                        key: 'contract_package_hash',
                        value:
                          '07f325378c0ad7222cc084d2dc82fc289157ef2925099d56b61556702a69adf2',
                      },
                      {
                        key: 'event_type',
                        value: 'cep47_mint_one',
                      },
                      {
                        key: 'recipient',
                        value:
                          'Key::Account(908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb)',
                      },
                      {
                        key: 'token_id',
                        value:
                          'zbyte-cep47-nft-06c84442-ea4a-4a94-8927-5659a4e39712',
                      },
                    ],
                    cl_type: {
                      Map: {
                        key: 'String',
                        value: 'String',
                      },
                    },
                  },
                },
              },
              {
                key: 'uref-c0afb29232889be7dc56dfaf306c9e5380a33d8f7793bc4ccaab6a44ab0701b3-000',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '0400000015000000636f6e74726163745f7061636b6167655f6861736840000000303766333235333738633061643732323263633038346432646338326663323839313537656632393235303939643536623631353536373032613639616466320a0000006576656e745f747970650e00000063657034375f6d696e745f6f6e6509000000726563697069656e744e0000004b65793a3a4163636f756e7428393038393739313537616232623836383533326464333964373031366633336330363635363834353961326466333835383638653862383363376661613265622908000000746f6b656e5f6964340000007a627974652d63657034372d6e66742d39646134663635632d323931332d346365342d396435332d663336653561363564643331',
                    parsed: [
                      {
                        key: 'contract_package_hash',
                        value:
                          '07f325378c0ad7222cc084d2dc82fc289157ef2925099d56b61556702a69adf2',
                      },
                      {
                        key: 'event_type',
                        value: 'cep47_mint_one',
                      },
                      {
                        key: 'recipient',
                        value:
                          'Key::Account(908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb)',
                      },
                      {
                        key: 'token_id',
                        value:
                          'zbyte-cep47-nft-9da4f65c-2913-4ce4-9d53-f36e5a65dd31',
                      },
                    ],
                    cl_type: {
                      Map: {
                        key: 'String',
                        value: 'String',
                      },
                    },
                  },
                },
              },
              {
                key: 'uref-ba0afa64abf3de513383c8a32731a7c4ae51248f182cea0702b60bb2ee32d991-000',
                transform: {
                  WriteCLValue: {
                    bytes:
                      '0400000015000000636f6e74726163745f7061636b6167655f6861736840000000303766333235333738633061643732323263633038346432646338326663323839313537656632393235303939643536623631353536373032613639616466320a0000006576656e745f747970650e00000063657034375f6d696e745f6f6e6509000000726563697069656e744e0000004b65793a3a4163636f756e7428393038393739313537616232623836383533326464333964373031366633336330363635363834353961326466333835383638653862383363376661613265622908000000746f6b656e5f6964340000007a627974652d63657034372d6e66742d36386136336637342d303236372d346635332d383439392d356434353330373331316637',
                    parsed: [
                      {
                        key: 'contract_package_hash',
                        value:
                          '07f325378c0ad7222cc084d2dc82fc289157ef2925099d56b61556702a69adf2',
                      },
                      {
                        key: 'event_type',
                        value: 'cep47_mint_one',
                      },
                      {
                        key: 'recipient',
                        value:
                          'Key::Account(908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb)',
                      },
                      {
                        key: 'token_id',
                        value:
                          'zbyte-cep47-nft-68a63f74-0267-4f53-8499-5d45307311f7',
                      },
                    ],
                    cl_type: {
                      Map: {
                        key: 'String',
                        value: 'String',
                      },
                    },
                  },
                },
              },
              {
                key: 'deploy-4c1b76a088b734a18c1c95ffbe2066818d231c3a164a4bc6672eaa3770b5efc2',
                transform: {
                  WriteDeployInfo: {
                    gas: '4282154840',
                    from: 'account-hash-908979157ab2b868532dd39d7016f33c066568459a2df385868e8b83c7faa2eb',
                    source:
                      'uref-b9a5f8d574aa06a6fc23be18a1b7acec5204e3e73850073b7bc65eba91d02326-007',
                    transfers: [],
                    deploy_hash:
                      '4c1b76a088b734a18c1c95ffbe2066818d231c3a164a4bc6672eaa3770b5efc2',
                  },
                },
              },
              {
                key: 'hash-8cf5e4acf51f54eb59291599187838dc3bc234089c46fc6ca8ad17e762ae4401',
                transform: 'Identity',
              },
              {
                key: 'hash-624dbe2395b9d9503fbee82162f1714ebff6b639f96d2084d26d944c354ec4c5',
                transform: 'Identity',
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: 'Identity',
              },
              {
                key: 'hash-8cf5e4acf51f54eb59291599187838dc3bc234089c46fc6ca8ad17e762ae4401',
                transform: 'Identity',
              },
              {
                key: 'hash-010c3fe81b7b862e50c77ef9a958a05bfa98444f26f96f23d37a13c96244cfb7',
                transform: 'Identity',
              },
              {
                key: 'hash-9824d60dc3a5c44a20b9fd260a412437933835b52fc683d8ae36e4ec2114843e',
                transform: 'Identity',
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: 'Identity',
              },
              {
                key: 'balance-56a7d60762a0b744630e25ab3113e6057625c263d8a588df55d230531e4c9234',
                transform: 'Identity',
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: {
                  WriteCLValue: {
                    bytes: '00',
                    parsed: '0',
                    cl_type: 'U512',
                  },
                },
              },
              {
                key: 'balance-56a7d60762a0b744630e25ab3113e6057625c263d8a588df55d230531e4c9234',
                transform: {
                  AddUInt512: '6250000000',
                },
              },
            ],
          },
          transfers: [],
        },
      },
    },
  ];

  const mockJsonRpc = {
    getDeployInfo: jest.fn().mockResolvedValue({
      deploy: mockRawDeploy,
      execution_results: mockRawExecutionResults,
    }),
  };

  const mockRpcClient = new RpcApi(mockJsonRpc as any);

  const deploy = await mockRpcClient.getDeploy(mockDeployHash);

  const mockDeploy = {
    timestamp: dateTimeString,
    timeSince: deploy?.timeSince,
    readableTimestamp: formatDate(dateTime),
    deployHash: mockDeployHash,
    blockHash: mockBlockHash,
    publicKey: mockPublicKey,
    action: 'mint_copies',
    amount: undefined,
    deployType: 'StoredContractByHash',
    paymentAmount: '6250000000',
    cost: '4282154840',
    status: DeployStatus.Success,
    rawDeploy: JSON.stringify({
      deploy: mockRawDeploy,
      execution_results: mockRawExecutionResults,
    }),
  };

  expect(mockJsonRpc.getDeployInfo).toHaveBeenCalledTimes(1);
  expect(mockJsonRpc.getDeployInfo).toHaveBeenCalledWith(mockDeployHash);
  expect(deploy).toEqual(mockDeploy);
};

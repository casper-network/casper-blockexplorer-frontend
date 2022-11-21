/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { formatDate } from '../../../utils';
import { RpcApi } from '../../rpc-client';
import { DeployStatus } from '../../types';

export const undelegate = async () => {
  const dateTime = new Date();
  const dateTimeString = dateTime.toString();

  const mockDeployHash =
    '6219d151c008993ad7a854d66c508dde486cdbda9c7580e92a974ea7b08fdab6';
  const mockBlockHash =
    '7a6bc0ea6f1d38703d6b782ee98dd7dfb26e05237ed21e1b6f7ef20ef9b434a0';
  const mockPublicKey =
    '0203eb17b6f95ec520ef0cee25b396dcf4db835c40405804155532f63cb5e21e345a';

  const mockRawDeploy = {
    hash: mockDeployHash,
    header: {
      ttl: '30m',
      account:
        '0203eb17b6f95ec520ef0cee25b396dcf4db835c40405804155532f63cb5e21e345a',
      body_hash:
        'e536be8f5b14edb802e054dd51d76ca66389e1012a804c89a4813493642621cf',
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
              bytes: '021027',
              parsed: '10000',
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
            'delegator',
            {
              bytes:
                '0203eb17b6f95ec520ef0cee25b396dcf4db835c40405804155532f63cb5e21e345a',
              parsed:
                '0203eb17b6f95ec520ef0cee25b396dcf4db835c40405804155532f63cb5e21e345a',
              cl_type: 'PublicKey',
            },
          ],
          [
            'validator',
            {
              bytes:
                '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
              parsed:
                '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
              cl_type: 'PublicKey',
            },
          ],
          [
            'amount',
            {
              bytes: '050088526a74',
              parsed: '500000000000',
              cl_type: 'U512',
            },
          ],
        ],
        hash: '93d923e336b20a4c4ca14d592b60e5bd3fe330775618290104f9beb326db7ae2',
        entry_point: 'undelegate',
      },
      approvals: [
        {
          signer:
            '0203eb17b6f95ec520ef0cee25b396dcf4db835c40405804155532f63cb5e21e345a',
          signature: mockPublicKey,
        },
      ],
    },
  };

  const mockRawExecutionResults = [
    {
      block_hash: mockBlockHash,
      result: {
        Success: {
          cost: '10000',
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
                key: 'balance-7c711372b1bfccf1db8ba33e8a3939d0df9746558f85e850ac5ce5a5f1561922',
                transform: 'Identity',
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: 'Identity',
              },
              {
                key: 'balance-7c711372b1bfccf1db8ba33e8a3939d0df9746558f85e850ac5ce5a5f1561922',
                transform: {
                  WriteCLValue: {
                    bytes: '059507689871',
                    parsed: '487888258965',
                    cl_type: 'U512',
                  },
                },
              },
              {
                key: 'balance-98d945f5324f865243b7c02c0417ab6eac361c5c56602fd42ced834a1ba201b6',
                transform: {
                  AddUInt512: '10000',
                },
              },
              {
                key: 'hash-93d923e336b20a4c4ca14d592b60e5bd3fe330775618290104f9beb326db7ae2',
                transform: 'Identity',
              },
              {
                key: 'hash-e375d42c29c0e4b2baefa63cf2d70af34439eda851e08129d8515515d63bd6a9',
                transform: 'Identity',
              },
              {
                key: 'bid-9d3751e053ab242b1720f40bd13799eda0fdc3a4b001bc763b20d811f9f9964d',
                transform: 'Identity',
              },
              {
                key: 'balance-27a0260de1af1ca864007d81e376c1cd15f0fc169a8ee92be0ab968682c12d1e',
                transform: 'Identity',
              },
              {
                key: 'withdraw-9d3751e053ab242b1720f40bd13799eda0fdc3a4b001bc763b20d811f9f9964d',
                transform: 'Identity',
              },
              {
                key: 'uref-550c01b27069f943c354364c49a496b5013ee5bdf61d8644e4f0712cf22410f1-000',
                transform: 'Identity',
              },
              {
                key: 'withdraw-9d3751e053ab242b1720f40bd13799eda0fdc3a4b001bc763b20d811f9f9964d',
                transform: {
                  WriteWithdraw: [
                    {
                      amount: '500000000000',
                      bonding_purse:
                        'uref-27a0260de1af1ca864007d81e376c1cd15f0fc169a8ee92be0ab968682c12d1e-007',
                      era_of_creation: 7015,
                      unbonder_public_key:
                        '0203eb17b6f95ec520ef0cee25b396dcf4db835c40405804155532f63cb5e21e345a',
                      validator_public_key:
                        '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                    },
                  ],
                },
              },
              {
                key: 'uref-7b7bd65a7d32c4939d0b97bd902adc5d5f5baf2c2d4365d16953066877930fab-000',
                transform: 'Identity',
              },
              {
                key: 'bid-9d3751e053ab242b1720f40bd13799eda0fdc3a4b001bc763b20d811f9f9964d',
                transform: {
                  WriteBid: {
                    inactive: true,
                    delegators: {
                      '0108ce22bc4ab164f43ea550dc3e63d3c4e7e3e8bb48a8aec0e6b2bc4183769cb3':
                        {
                          bonding_purse:
                            'uref-35996ba9c6c76dcc8cb07309d218ca5bac6555d8480d377f36b79ec7a53106ac-007',
                          staked_amount: '1108190349360',
                          vesting_schedule: null,
                          delegator_public_key:
                            '0108ce22bc4ab164f43ea550dc3e63d3c4e7e3e8bb48a8aec0e6b2bc4183769cb3',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '010c74c16ceb80297e5eb7b838bcfe3c659044d411301cc4c6f6f6a4a6a667f389':
                        {
                          bonding_purse:
                            'uref-b12b106645c23925b5e1d0358f3891f73598841f70077f52be642609e04927d8-007',
                          staked_amount: '1052244599599',
                          vesting_schedule: null,
                          delegator_public_key:
                            '010c74c16ceb80297e5eb7b838bcfe3c659044d411301cc4c6f6f6a4a6a667f389',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '011291d23e624f51083ea7e9de7796d0ab2c404e61a21383f6ad4a96d21f2aaaea':
                        {
                          bonding_purse:
                            'uref-dff1e706332e904486f766f9ba8f64d3db591b503d7c475ecd8548e7e914f982-007',
                          staked_amount: '1108190349360',
                          vesting_schedule: null,
                          delegator_public_key:
                            '011291d23e624f51083ea7e9de7796d0ab2c404e61a21383f6ad4a96d21f2aaaea',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '01178541ff76dbb3a426ed2ca32dc12cb7864be16c27f8b4c012531b2181af3f45':
                        {
                          bonding_purse:
                            'uref-1f65b5a9c582345ca27c8dbb5bd6fab64c277fd0b03d8f64687c102e7ba938e1-007',
                          staked_amount: '1108190349360',
                          vesting_schedule: null,
                          delegator_public_key:
                            '01178541ff76dbb3a426ed2ca32dc12cb7864be16c27f8b4c012531b2181af3f45',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '011f8052e480c0e989eaef9b432aef29b654f784eb0b3ea5d142d36aca3c62348f':
                        {
                          bonding_purse:
                            'uref-7f98b799ff9506b6b473a1dd5f3e1449abd399af08583fd552e9caae1c1b7ce1-007',
                          staked_amount: '1108190349360',
                          vesting_schedule: null,
                          delegator_public_key:
                            '011f8052e480c0e989eaef9b432aef29b654f784eb0b3ea5d142d36aca3c62348f',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '012485da0f89cffc02ad3fd2a855753870c9e010eed1adc3a5e1feefdc21403dba':
                        {
                          bonding_purse:
                            'uref-cd089c98d2e320288c4fef6d94e35a77df5aa1dbe066a0f387b503f0f0fa79a3-007',
                          staked_amount: '1108190349360',
                          vesting_schedule: null,
                          delegator_public_key:
                            '012485da0f89cffc02ad3fd2a855753870c9e010eed1adc3a5e1feefdc21403dba',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '01385303d7424cfc14f552276ae235be7bf74bda8979fc3c25233ba9f364d7ba0a':
                        {
                          bonding_purse:
                            'uref-2517949fd5cd3a321b512f80a849325c4edc5ebba6ba40b6a27b8749726daea2-007',
                          staked_amount: '1116160996998',
                          vesting_schedule: null,
                          delegator_public_key:
                            '01385303d7424cfc14f552276ae235be7bf74bda8979fc3c25233ba9f364d7ba0a',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '013e180d46e12309370d8367733917f852deae5cdf51007c819a2ec21ca1c439a2':
                        {
                          bonding_purse:
                            'uref-78ae27a500c0b732beedd2080911491461069bf2caceebff682f5c6022d0756e-007',
                          staked_amount: '1108190349360',
                          vesting_schedule: null,
                          delegator_public_key:
                            '013e180d46e12309370d8367733917f852deae5cdf51007c819a2ec21ca1c439a2',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '014996a7f68e68ae6e35a5d4aaf44afe49705434f5a18f50e97d7966616e03b630':
                        {
                          bonding_purse:
                            'uref-65029f5610bbd68ba88df58a44a81f810d70937ab26c75d7f3d87f996f41416b-007',
                          staked_amount: '1116160996998',
                          vesting_schedule: null,
                          delegator_public_key:
                            '014996a7f68e68ae6e35a5d4aaf44afe49705434f5a18f50e97d7966616e03b630',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '0158b25f33a0d746115d067f2fe12f90a4a8af63203c07586bd5d4db90960eb248':
                        {
                          bonding_purse:
                            'uref-abbadb441060285629c417528c28746f659b09c0cb2c33aa12f44eff34595682-007',
                          staked_amount: '93412610802933',
                          vesting_schedule: null,
                          delegator_public_key:
                            '0158b25f33a0d746115d067f2fe12f90a4a8af63203c07586bd5d4db90960eb248',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '017143c9270c18aa3a0a64c8a5cf7b59eb737882757ba4d1307ee6929ddf35e5e8':
                        {
                          bonding_purse:
                            'uref-ebbc38c40da952d9cac059568458f2eeef67eeb6c4001527c75693e13b30144f-007',
                          staked_amount: '1108190349360',
                          vesting_schedule: null,
                          delegator_public_key:
                            '017143c9270c18aa3a0a64c8a5cf7b59eb737882757ba4d1307ee6929ddf35e5e8',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '017fc7440c223f195f9026c3852d2d1470745e15d670c19442a21c8eb20f592d1a':
                        {
                          bonding_purse:
                            'uref-697bdada8eb696a2a6dae50ed25bb297d5beb0278d6afdfa7c9bc128e147423d-007',
                          staked_amount: '1116160996998',
                          vesting_schedule: null,
                          delegator_public_key:
                            '017fc7440c223f195f9026c3852d2d1470745e15d670c19442a21c8eb20f592d1a',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '0185578ee2f4d92679831c5d98a3572a9b754b5079a0000f91d61992ceca6242fb':
                        {
                          bonding_purse:
                            'uref-b2be43df8d0d1791c9b06961acb56b992eb78416c78b67a2261e86387d4b4f80-007',
                          staked_amount: '534463165779',
                          vesting_schedule: null,
                          delegator_public_key:
                            '0185578ee2f4d92679831c5d98a3572a9b754b5079a0000f91d61992ceca6242fb',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '01a61b8ae498d8e74c5ea9b4a410b23499e2f83a234808de65ee3fa48933420c69':
                        {
                          bonding_purse:
                            'uref-5bb133c44692e07f508e4a6ddff23d6d383e7bb63dfeeec61a78d1db75cf0bea-007',
                          staked_amount: '1108190349360',
                          vesting_schedule: null,
                          delegator_public_key:
                            '01a61b8ae498d8e74c5ea9b4a410b23499e2f83a234808de65ee3fa48933420c69',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '01bc32e44c49a172c906a8cb44c12c725d6a9276f5b7ead3bf10dc14ba41fad732':
                        {
                          bonding_purse:
                            'uref-2e146d125341c996cf886ddf02202558d3ccfdd400ff5cf089d67b053a388057-007',
                          staked_amount: '1108190349360',
                          vesting_schedule: null,
                          delegator_public_key:
                            '01bc32e44c49a172c906a8cb44c12c725d6a9276f5b7ead3bf10dc14ba41fad732',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '01bd034a1b3ef8ab38c54996c753cd1f09ef7be0bd7aeb202fcf7785a29403207c':
                        {
                          bonding_purse:
                            'uref-0197ce7b7f76cd7f32f8c70abd73ea44ed3bcab3fe159bea3271651e1dd0f0cb-007',
                          staked_amount: '1107768809043',
                          vesting_schedule: null,
                          delegator_public_key:
                            '01bd034a1b3ef8ab38c54996c753cd1f09ef7be0bd7aeb202fcf7785a29403207c',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '01bd053f8af77e5b1d7c738448baae538c4628444b4f396b3804e5a929ed759830':
                        {
                          bonding_purse:
                            'uref-98141a78059c53314f977b111936079c2739939f417028d38a9d62c2fcaaa7c0-007',
                          staked_amount: '1116160996998',
                          vesting_schedule: null,
                          delegator_public_key:
                            '01bd053f8af77e5b1d7c738448baae538c4628444b4f396b3804e5a929ed759830',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '01c06d46ae0902b06aa7c5e10984cbaa73a64bce81469c6168e861d3d1ddfbf738':
                        {
                          bonding_purse:
                            'uref-006c39c95e66fbf739d7d84ba97b9c1e1156d682cf69e9b63f487af36b5b03bd-007',
                          staked_amount: '1116160996998',
                          vesting_schedule: null,
                          delegator_public_key:
                            '01c06d46ae0902b06aa7c5e10984cbaa73a64bce81469c6168e861d3d1ddfbf738',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '01d81a4aa1e56ffb0c7757cd805ceca5bee1a3a1df0c14d548014b31166ba8ba8b':
                        {
                          bonding_purse:
                            'uref-c2a07885ab0d4a0d26ebf0bafa96c6f81f194e5d729aae9febd6fd40811dce09-007',
                          staked_amount: '1116160996998',
                          vesting_schedule: null,
                          delegator_public_key:
                            '01d81a4aa1e56ffb0c7757cd805ceca5bee1a3a1df0c14d548014b31166ba8ba8b',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '01dc08212c244d8445648c5e5bab4a2b61366aa0ac5e38acfffb41ac2bcac0e371':
                        {
                          bonding_purse:
                            'uref-cf682dfa19e0edbe85b952f4ae9a4ff0fee0cdf886a0897645745f07ccf2314d-007',
                          staked_amount: '1108190349360',
                          vesting_schedule: null,
                          delegator_public_key:
                            '01dc08212c244d8445648c5e5bab4a2b61366aa0ac5e38acfffb41ac2bcac0e371',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '01e20e675c9fced7f3bbfa0ab6263968ad4bf3b928b97fa57883b624e179af038b':
                        {
                          bonding_purse:
                            'uref-994deaeeede20fea81ada1fafa093646768ea6fedcc228c05c961ec493b07431-007',
                          staked_amount: '1116160996998',
                          vesting_schedule: null,
                          delegator_public_key:
                            '01e20e675c9fced7f3bbfa0ab6263968ad4bf3b928b97fa57883b624e179af038b',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '01ede1ebde84b91c0c97b9ee32d8636181eab85f0611b26528ca1e678bc1c08ba7':
                        {
                          bonding_purse:
                            'uref-24352eac6bc7ea26c25e0f202c7d0a782ee52fdeff2f627e45b28eb60f120f03-007',
                          staked_amount: '22275745415775',
                          vesting_schedule: null,
                          delegator_public_key:
                            '01ede1ebde84b91c0c97b9ee32d8636181eab85f0611b26528ca1e678bc1c08ba7',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '01f330875578d100fb4981e20a02141a82cb008193dc3adf49a22a6314a325e6d1':
                        {
                          bonding_purse:
                            'uref-ac58b75fe1ac61872e02b2fcba3c4e8cfd341a1ef1cd812002aa65e2343a64a1-007',
                          staked_amount: '1108190349360',
                          vesting_schedule: null,
                          delegator_public_key:
                            '01f330875578d100fb4981e20a02141a82cb008193dc3adf49a22a6314a325e6d1',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '01f5136cdb81e074a9bfd640be833eaf76b1da276145beb9c5eb299da38a27d7fc':
                        {
                          bonding_purse:
                            'uref-ae393d659876acde0b1259577722a213f87e1bed7ed805c58d1307d90162087e-007',
                          staked_amount: '1116160996998',
                          vesting_schedule: null,
                          delegator_public_key:
                            '01f5136cdb81e074a9bfd640be833eaf76b1da276145beb9c5eb299da38a27d7fc',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '01fb15ba6791eac006b4358caef81570ec3d8fd340a656a0fff3c019984175db5c':
                        {
                          bonding_purse:
                            'uref-7036dca7898ac3c6b460074fc7de8f253baa07aa8dddcc72a4979be9bfedc210-007',
                          staked_amount: '1116160996998',
                          vesting_schedule: null,
                          delegator_public_key:
                            '01fb15ba6791eac006b4358caef81570ec3d8fd340a656a0fff3c019984175db5c',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '02021e9c3647c52a2be25effe4abc01db9789b9fadc1c7395aa72573b0e7ec0320b6':
                        {
                          bonding_purse:
                            'uref-9a3877d4026f35522c7e38d35d87f0227d345c233559b1ade17c02a3ed8038b0-007',
                          staked_amount: '529141143940',
                          vesting_schedule: null,
                          delegator_public_key:
                            '02021e9c3647c52a2be25effe4abc01db9789b9fadc1c7395aa72573b0e7ec0320b6',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '02036ccd012682c0a7896e483ee24e2292203557083fb8226f7f4930d8572b0b8642':
                        {
                          bonding_purse:
                            'uref-a9449d24ea44c96ca1a81f3f5250dabb950130902d07eb248c3abd7267fd2a6c-007',
                          staked_amount: '961685811210',
                          vesting_schedule: null,
                          delegator_public_key:
                            '02036ccd012682c0a7896e483ee24e2292203557083fb8226f7f4930d8572b0b8642',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                      '0203add7620725de2afc4f7e93cad357b291d3297723374e6fa572aa56f584d6d57c':
                        {
                          bonding_purse:
                            'uref-6753c1e626cbe27bcb360c21fea44e35b3ed640cd9344da7527e6d8c049967b6-007',
                          staked_amount: '557778655797',
                          vesting_schedule: null,
                          delegator_public_key:
                            '0203add7620725de2afc4f7e93cad357b291d3297723374e6fa572aa56f584d6d57c',
                          validator_public_key:
                            '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                        },
                    },
                    bonding_purse:
                      'uref-8363336c4487d675e303087df24d3d53365b04d6421c4699d233075ffa620da2-007',
                    staked_amount: '5877429595483',
                    delegation_rate: 2,
                    vesting_schedule: null,
                    validator_public_key:
                      '01f4712780715807e7d84cd4036a43f8a497cf08e8bc0f1aabec483133d3253a83',
                  },
                },
              },
              {
                key: 'deploy-6219d151c008993ad7a854d66c508dde486cdbda9c7580e92a974ea7b08fdab6',
                transform: {
                  WriteDeployInfo: {
                    gas: '10000',
                    from: 'account-hash-3156edfa7b1149342501b572cd16ea05bc39c03ac01786c6ae488048a2871686',
                    source:
                      'uref-7c711372b1bfccf1db8ba33e8a3939d0df9746558f85e850ac5ce5a5f1561922-007',
                    transfers: [],
                    deploy_hash:
                      '6219d151c008993ad7a854d66c508dde486cdbda9c7580e92a974ea7b08fdab6',
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
                key: 'balance-fb1c5f18db52e7d009b6f216aa70cd5fdba23982a5a2f457f5d82fab88038f60',
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
                key: 'balance-fb1c5f18db52e7d009b6f216aa70cd5fdba23982a5a2f457f5d82fab88038f60',
                transform: {
                  AddUInt512: '10000',
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
    action: 'undelegate',
    amount: undefined,
    deployType: 'StoredContractByHash',
    paymentAmount: '10000',
    cost: '10000',
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

import React from 'react';
import { render } from '../../../test-utils';
import { screen } from '@testing-library/react';
import { BlockDetailsCard } from './BlockDetailsCard';

jest.mock('react-i18next', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const englishTranslations = jest.requireActual(
    '../../../../public/locales/en/translation.json',
  );

  return {
    useTranslation: () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return { t: (key: string) => englishTranslations[key] };
    },
  };
});

const getMockBlock = () => ({
  hash: 'cc834d21631386f662c71340c280247408659d0daaeadec1db2c9d71068aa859',
  header: {
    parent_hash:
      '63fe8e857de5a2373c28bb99cd724577501de6503c436b54cd5f7c897d2357f3',
    state_root_hash:
      '742757f17899de99826e48257a144871bfe07654babc595c2ae37d60c8deea91',
    body_hash:
      '8838601f62413e9ff9144f52fda4a6d0b5c7152fe2f3f1cd1b7732794db9ef99',
    random_bit: true,
    accumulated_seed:
      '"5e843ced915f4324fb885e8ff15f791434acf950cac1f2d2c9c0adaf336d23fd"',
    era_end: null,
    timestamp: '2023-05-17T18:37:13.088Z',
    era_id: 9309,
    height: 1742904,
    protocol_version: '1.4.15',
  },
  body: {
    proposer:
      '0138e64f04c03346e94471e340ca7b94ba3581e5697f4d1e59f5a31c0da720de45',
    deploy_hashes: [],
    transfer_hashes: [],
  },
  proofs: [],
});

describe('BlockDetailsCard', () => {
  it('should render the BlockDetailsCard', () => {
    render(<BlockDetailsCard block={getMockBlock()} isLoading={false} />);
    const blockDetailsCard = screen.getByTestId('block-details-card');

    expect(blockDetailsCard).toBeInTheDocument();
  });

  it('should render skeleton loaders for card details ', () => {
    render(<BlockDetailsCard block={getMockBlock()} isLoading />);

    const skeletonLoaders = screen.getAllByTestId('skeleton-loader');

    expect(skeletonLoaders.length).toEqual(11);
  });

  it('should render the BaseCard Component', () => {
    render(<BlockDetailsCard block={getMockBlock()} isLoading={false} />);
    const baseCard = screen.getByTestId('baseCard');
    const baseCardBody = screen.getByTestId('baseCardBody');

    expect(baseCard).toBeInTheDocument();
    expect(baseCard).toContainElement(baseCardBody);
  });

  it('should render the BaseCard body content', async () => {
    render(<BlockDetailsCard block={getMockBlock()} isLoading={false} />);
    const { hash, header, body } = getMockBlock();

    const baseCardBody = screen.getByTestId('baseCardBody');

    const blockHeight = screen.getByTestId('block-height');
    const currentEra = screen.getByTestId('current-era');
    const timestamp = screen.getByTestId('timestamp');
    const parentHash = screen.getByTestId('parent-hash');
    const blockHash = screen.getByTestId('block-hash');
    const stateRootHash = screen.getByTestId('state-root-hash');
    const validator = screen.getByTestId('validator');

    expect(baseCardBody).toBeInTheDocument();

    expect(baseCardBody).toHaveTextContent('Block Height');
    expect(blockHeight).toHaveTextContent(header.height.toString());
    expect(baseCardBody).toHaveTextContent('Current Era');
    expect(currentEra).toHaveTextContent(header.era_id.toString());
    expect(baseCardBody).toHaveTextContent('Timestamp');
    expect(timestamp).toHaveTextContent(header.timestamp);
    expect(baseCardBody).toHaveTextContent('Parent Hash');
    expect(parentHash).toHaveTextContent(header.parent_hash);
    expect(baseCardBody).toHaveTextContent('Block Hash');
    expect(blockHash).toHaveTextContent(hash);
    expect(baseCardBody).toHaveTextContent('State Root Hash');
    expect(stateRootHash).toHaveTextContent(header.state_root_hash);
    expect(baseCardBody).toHaveTextContent('Validator');
    expect(validator).toHaveTextContent(body.proposer);
    expect(baseCardBody).toHaveTextContent('Raw Data');
    expect(baseCardBody).toHaveTextContent('Deploys');
    expect(baseCardBody).toHaveTextContent('Transfers');
  });
});

// <body>
//   <div>
//     <div
//       data-testid="block-details-card"
//     >
//       <div
//         class="css-f1ukj5"
//       >
//         <div
//           class="css-1iyoj2o"
//         >
//           <h2
//             class="css-s2adg6"
//           >
//             <span
//               class="css-56u59w"
//               data-testid="hash"
//             >
//               cc834...aa859
//             </span>
//           </h2>
//           <button
//             class="css-1fo4fhd"
//             color="blue"
//             type="button"
//           >
//             undefined
//           </button>
//         </div>
//       </div>
//       <div
//         class="css-19847w4"
//         data-testid="baseCard"
//       >
//         <div
//           class="body"
//           data-testid="baseCardBody"
//         >
//           <ul
//             class="css-gdvgp8"
//           >
//             <li>
//               <h3
//                 class="css-w30hmz"
//               >
//                 Block Height
//               </h3>
//               <div
//                 class="css-16vz71b"
//                 data-testid="block-height"
//               >
//                 1742904
//               </div>
//             </li>
//             <li>
//               <h3
//                 class="css-w30hmz"
//               >
//                 Current Era
//               </h3>
//               <div
//                 class="css-16vz71b"
//                 data-testid="current-era"
//               >
//                 9309
//               </div>
//             </li>
//             <li>
//               <h3
//                 class="css-w30hmz"
//               >
//                 Timestamp
//               </h3>
//               <div
//                 class="css-16vz71b"
//                 data-testid="timestamp"
//               >
//                 2023-05-17T18:37:13.088Z
//               </div>
//             </li>
//           </ul>
//           <div
//             class="css-1bcfwi5"
//             height="2.5rem"
//           />
//           <ul
//             class="css-4wjmim"
//           >
//             <li>
//               <h3
//                 class="css-w30hmz"
//               >
//                 Parent Hash
//               </h3>
//               <div
//                 class="css-1swodwe"
//                 data-testid="parent-hash"
//                 height="2rem"
//               >
//                 <a
//                   class="css-540aqf"
//                   href="/block/63fe8e857de5a2373c28bb99cd724577501de6503c436b54cd5f7c897d2357f3"
//                 >
//                   <span
//                     class="css-56u59w"
//                     data-testid="hash"
//                   >
//                     63fe8e857de5a2373c28bb99cd724577501de6503c436b54cd5f7c897d2357f3
//                   </span>
//                 </a>
//                 <button
//                   class="css-l5ul5z"
//                   type="button"
//                 >
//                   <svg
//                     class="css-vbx3kw"
//                     data-testid="copy-icon"
//                   >
//                     copy-icon.svg
//                   </svg>
//                 </button>
//               </div>
//             </li>
//             <li>
//               <h3
//                 class="css-w30hmz"
//               >
//                 Block Hash
//               </h3>
//               <div
//                 class="css-1swodwe"
//                 data-testid="block-hash"
//                 height="2rem"
//               >
//                 <span
//                   class="css-56u59w"
//                   data-testid="hash"
//                 >
//                   cc834d21631386f662c71340c280247408659d0daaeadec1db2c9d71068aa859
//                 </span>
//                 <button
//                   class="css-l5ul5z"
//                   type="button"
//                 >
//                   <svg
//                     class="css-vbx3kw"
//                     data-testid="copy-icon"
//                   >
//                     copy-icon.svg
//                   </svg>
//                 </button>
//               </div>
//             </li>
//             <li>
//               <h3
//                 class="css-w30hmz"
//               >
//                 State Root Hash
//               </h3>
//               <div
//                 class="css-n1frap"
//                 data-testid="state-root-hash"
//               >
//                 <span
//                   class="css-56u59w"
//                   data-testid="hash"
//                 >
//                   742757f17899de99826e48257a144871bfe07654babc595c2ae37d60c8deea91
//                 </span>
//               </div>
//             </li>
//             <li>
//               <h3
//                 class="css-w30hmz"
//               >
//                 Validator
//               </h3>
//               <div
//                 class="css-1swodwe"
//                 data-testid="state-root-hash"
//                 height="2rem"
//               >
//                 <a
//                   class="css-540aqf"
//                   href="/account/0138e64f04c03346e94471e340ca7b94ba3581e5697f4d1e59f5a31c0da720de45"
//                 >
//                   <span
//                     class="css-56u59w"
//                     data-testid="hash"
//                   >
//                     0138e64f04c03346e94471e340ca7b94ba3581e5697f4d1e59f5a31c0da720de45
//                   </span>
//                 </a>
//                 <button
//                   class="css-l5ul5z"
//                   type="button"
//                 >
//                   <svg
//                     class="css-vbx3kw"
//                     data-testid="copy-icon"
//                   >
//                     copy-icon.svg
//                   </svg>
//                 </button>
//               </div>
//             </li>
//           </ul>
//           <div
//             class="css-1bcfwi5"
//             height="2.5rem"
//           />
//           <ul
//             class="css-gdvgp8"
//           >
//             <li>
//               <h3
//                 class="css-w30hmz"
//               >
//                 Raw Data
//               </h3>
//               <div
//                 class="css-n1frap"
//               >
//                 <div
//                   class="accordion"
//                   data-accordion-component="Accordion"
//                 >
//                   <div
//                     class="accordion__item"
//                     data-accordion-component="AccordionItem"
//                   >
//                     <div
//                       aria-level="3"
//                       class="accordion__heading"
//                       data-accordion-component="AccordionItemHeading"
//                       role="heading"
//                     >
//                       <div
//                         aria-controls="accordion__panel-:r7:"
//                         aria-disabled="false"
//                         aria-expanded="false"
//                         class="css-v7u91x"
//                         data-accordion-component="AccordionItemButton"
//                         id="accordion__heading-:r7:"
//                         role="button"
//                         tabindex="0"
//                       >
//                         Show Raw Data
//                       </div>
//                     </div>
//                     <div
//                       class="accordion__panel"
//                       data-accordion-component="AccordionItemPanel"
//                       hidden=""
//                       id="accordion__panel-:r7:"
//                     >
//                       <div
//                         class="css-1t9tqxg"
//                       >
//                         <div
//                           class="react-json-view"
//                           style="font-family: monospace; cursor: default; background-color: rgb(244, 244, 244); position: relative;"
//                         >
//                           <div
//                             class="pretty-json-container object-container"
//                           >
//                             <div
//                               class="object-content"
//                             >
//                               <div
//                                 class="object-key-val"
//                               >
//                                 <span>
//                                   <span
//                                     style="display: inline-block; cursor: pointer;"
//                                   >
//                                     <div
//                                       class="icon-container"
//                                       style="display: inline-block; width: 17px;"
//                                     >
//                                       <span
//                                         class="collapsed-icon"
//                                       >
//                                         <svg
//                                           fill="currentColor"
//                                           style="vertical-align: top; color: rgb(255, 45, 46); height: 1em; width: 1em; padding-left: 2px;"
//                                           viewBox="0 0 15 15"
//                                         >
//                                           <path
//                                             d="M0 14l6-6-6-6z"
//                                           />
//                                         </svg>
//                                       </span>
//                                     </div>
//                                     <span
//                                       style="display: inline-block; color: rgb(0, 0, 0); letter-spacing: 0.5px; font-style: none; vertical-align: top; opacity: 0.85;"
//                                     >
//                                       <span
//                                         class="object-key"
//                                       >
//                                         <span
//                                           style="vertical-align: top;"
//                                         >
//                                           "
//                                         </span>
//                                         <span>
//                                           root
//                                         </span>
//                                         <span
//                                           style="vertical-align: top;"
//                                         >
//                                           "
//                                         </span>
//                                       </span>
//                                       <span
//                                         style="display: inline-block; margin: 0px 5px; color: rgb(0, 0, 0); vertical-align: top;"
//                                       >
//                                         :
//                                       </span>
//                                     </span>
//                                     <span
//                                       style="display: inline-block; cursor: pointer; font-weight: bold; color: rgb(0, 0, 0);"
//                                     >
//                                       {
//                                     </span>
//                                   </span>
//                                 </span>
//                                 <div
//                                   class="node-ellipsis"
//                                   style="display: inline-block; color: rgb(0, 0, 0); font-size: 18px; line-height: 10px; cursor: pointer;"
//                                 >
//                                   ...
//                                 </div>
//                                 <span
//                                   class="brace-row"
//                                 >
//                                   <span
//                                     style="display: inline-block; cursor: pointer; font-weight: bold; color: rgb(0, 0, 0); padding-left: 0px;"
//                                   >
//                                     }
//                                   </span>
//                                   <div
//                                     class="object-meta-data"
//                                     style="display: inline-block; padding: 0px 0px 0px 10px;"
//                                   >
//                                     <span
//                                       class="object-size"
//                                       style="color: rgb(69, 137, 246); border-radius: 3px; font-style: italic; margin: 0px 6px 0px 0px; cursor: default;"
//                                     >
//                                       4
//                                        item
//                                       s
//                                     </span>
//                                     <span
//                                       class="copy-to-clipboard-container"
//                                       style="vertical-align: top; display: none;"
//                                       title="Copy to clipboard"
//                                     >
//                                       <span
//                                         style="cursor: pointer; display: inline;"
//                                       >
//                                         <span
//                                           class="copy-icon"
//                                         >
//                                           <svg
//                                             fill="currentColor"
//                                             preserveAspectRatio="xMidYMid meet"
//                                             style="vertical-align: top; color: rgb(255, 45, 46); font-size: 15px; margin-right: 3px; height: 1em; width: 1em;"
//                                             viewBox="0 0 40 40"
//                                           >
//                                             <g>
//                                               <path
//                                                 d="m30 35h-25v-22.5h25v7.5h2.5v-12.5c0-1.4-1.1-2.5-2.5-2.5h-7.5c0-2.8-2.2-5-5-5s-5 2.2-5 5h-7.5c-1.4 0-2.5 1.1-2.5 2.5v27.5c0 1.4 1.1 2.5 2.5 2.5h25c1.4 0 2.5-1.1 2.5-2.5v-5h-2.5v5z m-20-27.5h2.5s2.5-1.1 2.5-2.5 1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5 1.3 2.5 2.5 2.5h2.5s2.5 1.1 2.5 2.5h-20c0-1.5 1.1-2.5 2.5-2.5z m-2.5 20h5v-2.5h-5v2.5z m17.5-5v-5l-10 7.5 10 7.5v-5h12.5v-5h-12.5z m-17.5 10h7.5v-2.5h-7.5v2.5z m12.5-17.5h-12.5v2.5h12.5v-2.5z m-7.5 5h-5v2.5h5v-2.5z"
//                                               />
//                                             </g>
//                                           </svg>
//                                         </span>
//                                       </span>
//                                     </span>
//                                   </div>
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </li>
//             <li>
//               <h3
//                 class="css-w30hmz"
//               >
//                 Deploys
//               </h3>
//               <div
//                 class="css-16vz71b"
//               >
//                 No Deploys
//               </div>
//             </li>
//             <li>
//               <h3
//                 class="css-w30hmz"
//               >
//                 Transfers
//               </h3>
//               <div
//                 class="css-16vz71b"
//               >
//                 No Transfers
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   </div>
// </body>

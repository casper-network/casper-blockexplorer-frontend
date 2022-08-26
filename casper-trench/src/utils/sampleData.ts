export const sampleSolidityCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./IERC20.sol";

contract ERC20 is IERC20 {
    uint public totalSupply;
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;
    string public name = "Solidity by Example";
    string public symbol = "SOLBYEX";
    uint8 public decimals = 18;

    function transfer(address recipient, uint amount) external returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool) {
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function mint(uint amount) external {
        balanceOf[msg.sender] += amount;
        totalSupply += amount;
        emit Transfer(address(0), msg.sender, amount);
    }

    function burn(uint amount) external {
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }
}
`;

export const sampleJsonData = {
	deploy: {
		hash: 'd3d15ff396aa69512a24386c0319e20ccccd31436be0f450ef6bc1827d3b8244',
		header: {
			ttl: '30m',
			account: '0202ed20f3a93b5386bc41b6945722b2bd4250c48f5fa0632adf546e2f3ff6f4ddee',
			body_hash: '8be647a39c87f31fa23b8aac14425bc41b2b03321984845ed12a6c1c7a0bc361',
			gas_price: 1,
			timestamp: '2022-07-25T08:07:09.616Z',
			chain_name: 'casper',
			dependencies: []
		},
		payment: {
			ModuleBytes: {
				args: [
					[
						'amount',
						{
							bytes: '0400e1f505',
							parsed: '100000000',
							cl_type: 'U512'
						}
					]
				],
				module_bytes: ''
			}
		},
		session: {
			Transfer: {
				args: [
					[
						'amount',
						{
							bytes: '05803a5a4771',
							parsed: '486528400000',
							cl_type: 'U512'
						}
					],
					[
						'target',
						{
							bytes: '2ed94660447f722ae965e6899c8781851b0eb0900332c0829d123d44a217dcb1',
							parsed: '2ed94660447f722ae965e6899c8781851b0eb0900332c0829d123d44a217dcb1',
							cl_type: {
								ByteArray: 32
							}
						}
					],
					[
						'id',
						{
							bytes: '00',
							parsed: null,
							cl_type: {
								Option: 'U64'
							}
						}
					]
				]
			}
		},
		approvals: [
			{
				signer: '0202ed20f3a93b5386bc41b6945722b2bd4250c48f5fa0632adf546e2f3ff6f4ddee',
				signature:
					'02897b7db9b0c32cbdc647c492d0f84eca1f1ad05c5ff495b72a79d4e077806bc23079e820c99681e3ecaeaab812c704f213f1b00f172a0399e5c41a59f1da12d2'
			}
		]
	},
	api_version: '1.4.6',
	execution_results: [
		{
			result: {
				Success: {
					cost: '100000000',
					effect: {
						operations: [],
						transforms: [
							{
								key: 'hash-7cc1b1db4e08bbfe7bacf8e1ad828a5d9bcccbb33e55d322808c3a88da53213a',
								transform: 'Identity'
							},
							{
								key: 'hash-4475016098705466254edd18d267a9dad43e341d4dafadb507d0fe3cf2d4a74b',
								transform: 'Identity'
							},
							{
								key: 'uref-67442bf72bfd7bb1837b29b779a0534abf0213810cf2c63780a08c1072cebbda-000',
								transform: {
									WriteCLValue: {
										bytes: '',
										parsed: null,
										cl_type: 'Unit'
									}
								}
							},
							{
								key: 'balance-67442bf72bfd7bb1837b29b779a0534abf0213810cf2c63780a08c1072cebbda',
								transform: {
									WriteCLValue: {
										bytes: '00',
										parsed: '0',
										cl_type: 'U512'
									}
								}
							},
							{
								key: 'account-hash-2ed94660447f722ae965e6899c8781851b0eb0900332c0829d123d44a217dcb1',
								transform: {
									WriteAccount:
										'account-hash-2ed94660447f722ae965e6899c8781851b0eb0900332c0829d123d44a217dcb1'
								}
							},
							{
								key: 'account-hash-2ed94660447f722ae965e6899c8781851b0eb0900332c0829d123d44a217dcb1',
								transform: 'Identity'
							},
							{
								key: 'hash-d2469afeb99130f0be7c9ce230a84149e6d756e306ef8cf5b8a49d5182e41676',
								transform: 'Identity'
							},
							{
								key: 'hash-d63c44078a1931b5dc4b80a7a0ec586164fd0470ce9f8b23f6d93b9e86c5944d',
								transform: 'Identity'
							},
							{
								key: 'hash-7cc1b1db4e08bbfe7bacf8e1ad828a5d9bcccbb33e55d322808c3a88da53213a',
								transform: 'Identity'
							},
							{
								key: 'hash-4475016098705466254edd18d267a9dad43e341d4dafadb507d0fe3cf2d4a74b',
								transform: 'Identity'
							},
							{
								key: 'balance-d660f6c5235354e5e47ff221e7d4beacfb82169e3464e1e0013130ad49e51ed8',
								transform: 'Identity'
							},
							{
								key: 'balance-fe327f9815a1d016e1143db85e25a86341883949fd75ac1c1e7408a26c5b62ef',
								transform: 'Identity'
							},
							{
								key: 'balance-d660f6c5235354e5e47ff221e7d4beacfb82169e3464e1e0013130ad49e51ed8',
								transform: {
									WriteCLValue: {
										bytes: '07448172224d3379',
										parsed: '34114878565417284',
										cl_type: 'U512'
									}
								}
							},
							{
								key: 'balance-fe327f9815a1d016e1143db85e25a86341883949fd75ac1c1e7408a26c5b62ef',
								transform: {
									AddUInt512: '100000000'
								}
							},
							{
								key: 'hash-7cc1b1db4e08bbfe7bacf8e1ad828a5d9bcccbb33e55d322808c3a88da53213a',
								transform: 'Identity'
							},
							{
								key: 'hash-4475016098705466254edd18d267a9dad43e341d4dafadb507d0fe3cf2d4a74b',
								transform: 'Identity'
							},
							{
								key: 'uref-67442bf72bfd7bb1837b29b779a0534abf0213810cf2c63780a08c1072cebbda-000',
								transform: {
									WriteCLValue: {
										bytes: '',
										parsed: null,
										cl_type: 'Unit'
									}
								}
							},
							{
								key: 'balance-67442bf72bfd7bb1837b29b779a0534abf0213810cf2c63780a08c1072cebbda',
								transform: {
									WriteCLValue: {
										bytes: '00',
										parsed: '0',
										cl_type: 'U512'
									}
								}
							},
							{
								key: 'account-hash-2ed94660447f722ae965e6899c8781851b0eb0900332c0829d123d44a217dcb1',
								transform: {
									WriteAccount:
										'account-hash-2ed94660447f722ae965e6899c8781851b0eb0900332c0829d123d44a217dcb1'
								}
							},
							{
								key: 'account-hash-2ed94660447f722ae965e6899c8781851b0eb0900332c0829d123d44a217dcb1',
								transform: 'Identity'
							},
							{
								key: 'hash-d2469afeb99130f0be7c9ce230a84149e6d756e306ef8cf5b8a49d5182e41676',
								transform: 'Identity'
							},
							{
								key: 'hash-d63c44078a1931b5dc4b80a7a0ec586164fd0470ce9f8b23f6d93b9e86c5944d',
								transform: 'Identity'
							},
							{
								key: 'hash-7cc1b1db4e08bbfe7bacf8e1ad828a5d9bcccbb33e55d322808c3a88da53213a',
								transform: 'Identity'
							},
							{
								key: 'hash-4475016098705466254edd18d267a9dad43e341d4dafadb507d0fe3cf2d4a74b',
								transform: 'Identity'
							},
							{
								key: 'balance-d660f6c5235354e5e47ff221e7d4beacfb82169e3464e1e0013130ad49e51ed8',
								transform: 'Identity'
							},
							{
								key: 'balance-fe327f9815a1d016e1143db85e25a86341883949fd75ac1c1e7408a26c5b62ef',
								transform: 'Identity'
							},
							{
								key: 'balance-d660f6c5235354e5e47ff221e7d4beacfb82169e3464e1e0013130ad49e51ed8',
								transform: {
									WriteCLValue: {
										bytes: '07448172224d3379',
										parsed: '34114878565417284',
										cl_type: 'U512'
									}
								}
							},
							{
								key: 'balance-fe327f9815a1d016e1143db85e25a86341883949fd75ac1c1e7408a26c5b62ef',
								transform: {
									AddUInt512: '100000000'
								}
							},
							{
								key: 'hash-7cc1b1db4e08bbfe7bacf8e1ad828a5d9bcccbb33e55d322808c3a88da53213a',
								transform: 'Identity'
							},
							{
								key: 'hash-4475016098705466254edd18d267a9dad43e341d4dafadb507d0fe3cf2d4a74b',
								transform: 'Identity'
							},
							{
								key: 'balance-d660f6c5235354e5e47ff221e7d4beacfb82169e3464e1e0013130ad49e51ed8',
								transform: 'Identity'
							},
							{
								key: 'balance-67442bf72bfd7bb1837b29b779a0534abf0213810cf2c63780a08c1072cebbda',
								transform: 'Identity'
							},
							{
								key: 'balance-d660f6c5235354e5e47ff221e7d4beacfb82169e3464e1e0013130ad49e51ed8',
								transform: {
									WriteCLValue: {
										bytes: '07c44618dbdb3279',
										parsed: '34114392037017284',
										cl_type: 'U512'
									}
								}
							},
							{
								key: 'balance-67442bf72bfd7bb1837b29b779a0534abf0213810cf2c63780a08c1072cebbda',
								transform: {
									AddUInt512: '486528400000'
								}
							},
							{
								key: 'transfer-67442bf72bfd7bb1837b29b779a0534abf0213810cf2c63780a08c1072cebbda',
								transform: {
									WriteTransfer: {
										id: null,
										to: 'account-hash-2ed94660447f722ae965e6899c8781851b0eb0900332c0829d123d44a217dcb1',
										gas: '0',
										from: 'account-hash-49740daa2c2b02c657b748ae0fb98f55ca257ae24fa5a368c34b66fac3519c7d',
										amount: '486528400000',
										source:
											'uref-d660f6c5235354e5e47ff221e7d4beacfb82169e3464e1e0013130ad49e51ed8-007',
										target:
											'uref-67442bf72bfd7bb1837b29b779a0534abf0213810cf2c63780a08c1072cebbda-004',
										deploy_hash: 'd3d15ff396aa69512a24386c0319e20ccccd31436be0f450ef6bc1827d3b8244'
									}
								}
							},
							{
								key: 'deploy-d3d15ff396aa69512a24386c0319e20ccccd31436be0f450ef6bc1827d3b8244',
								transform: {
									WriteDeployInfo: {
										gas: '100000000',
										from: 'account-hash-49740daa2c2b02c657b748ae0fb98f55ca257ae24fa5a368c34b66fac3519c7d',
										source:
											'uref-d660f6c5235354e5e47ff221e7d4beacfb82169e3464e1e0013130ad49e51ed8-007',
										transfers: [
											'transfer-67442bf72bfd7bb1837b29b779a0534abf0213810cf2c63780a08c1072cebbda'
										],
										deploy_hash: 'd3d15ff396aa69512a24386c0319e20ccccd31436be0f450ef6bc1827d3b8244'
									}
								}
							},
							{
								key: 'hash-d2469afeb99130f0be7c9ce230a84149e6d756e306ef8cf5b8a49d5182e41676',
								transform: 'Identity'
							},
							{
								key: 'hash-d63c44078a1931b5dc4b80a7a0ec586164fd0470ce9f8b23f6d93b9e86c5944d',
								transform: 'Identity'
							},
							{
								key: 'balance-fe327f9815a1d016e1143db85e25a86341883949fd75ac1c1e7408a26c5b62ef',
								transform: 'Identity'
							},
							{
								key: 'hash-d2469afeb99130f0be7c9ce230a84149e6d756e306ef8cf5b8a49d5182e41676',
								transform: 'Identity'
							},
							{
								key: 'hash-7cc1b1db4e08bbfe7bacf8e1ad828a5d9bcccbb33e55d322808c3a88da53213a',
								transform: 'Identity'
							},
							{
								key: 'hash-4475016098705466254edd18d267a9dad43e341d4dafadb507d0fe3cf2d4a74b',
								transform: 'Identity'
							},
							{
								key: 'balance-fe327f9815a1d016e1143db85e25a86341883949fd75ac1c1e7408a26c5b62ef',
								transform: 'Identity'
							},
							{
								key: 'balance-6119a4a4f5dd82e2f3a4a4eaa93186a484e9af91470cdded60059a61273c51b5',
								transform: 'Identity'
							},
							{
								key: 'balance-fe327f9815a1d016e1143db85e25a86341883949fd75ac1c1e7408a26c5b62ef',
								transform: {
									WriteCLValue: {
										bytes: '00',
										parsed: '0',
										cl_type: 'U512'
									}
								}
							},
							{
								key: 'balance-6119a4a4f5dd82e2f3a4a4eaa93186a484e9af91470cdded60059a61273c51b5',
								transform: {
									AddUInt512: '100000000'
								}
							}
						]
					},
					transfers: ['transfer-67442bf72bfd7bb1837b29b779a0534abf0213810cf2c63780a08c1072cebbda']
				}
			},
			block_hash: '5c43d60de8881339ba688e82af7967a79121cb193eba5f1271b9111f588cbf1e'
		}
	]
};

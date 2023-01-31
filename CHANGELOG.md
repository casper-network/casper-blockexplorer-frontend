# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2023-01-26

### Added

- Switched `frontend` to use new middleware (`1.1.0`)
- New table in `/blocks`
- New more detailed view in `/peers`
- Number of validators & peers is now visible on the main page
- Translations mechanisms (`react-i18next`) - translations are in `public/translations`
- Support for SSE Sidecar (`SIDECAR_REST_URL` & `SIDECAR_EVENTSTREAM_URL` required to enable it)
- New `/peers` endpoint providing peers statuses (hash of last added block, uptime, ip)
- New endpoints: `/latest-block`, `/block/:hashOrHeight`, `/status`, `/blocks`, `/deploy/:hash`, `/account/:accountHashOrPublicKey`
- When it's possible, all of the endpoint support both Sidecar as well as RPC
- Added cache so number of RPC request is minimized

### Changed

- Redesigned layout of almost all pages

## [1.0.0] - 2022-10-13

### Added

- Basic block explorer views (blocks, peers, block details, account details, deploy details)
- Block explorer queries directly RPC
- Basic unit tests 
- Configurable branding
- Proxy layer that supports list of nodes in case one of them will be dead
- Basic tests

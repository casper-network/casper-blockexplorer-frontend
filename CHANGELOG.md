# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

-Refactored e2e tests for Accounts and Blocks pages
-Updated frontend mobile styles
## [1.4.0] - 2023-06-22

### Added

- Search params for table pagination/sorting
- More internal UI-kit components
- Unit tests for some critical components
- Fixed a small external package vulnerability
- Addressed minor UI styles for mobile
- Updated validators table to include next era

## [1.3.0] - 2023-05-08

### Added

- Skeleton loaders for details screens
- Implemented dark theme with theme toggler
- Added some internal UI-kit components

## [1.2.0] - 2023-03-08

### Added

- Skeleton loaders
- Active navbuttons in the topbar
- Update validators table to include formatted columns and sorting
- Nicer loading on the main page
- Switched all tables to paginated ones
- Changed architecture from Tanstack Query to Redux

### Fixed

- Fixed some frontend styles

### Changed

- Redesigned layout of almost all pages

## [1.1.0] - 2023-01-26

### Added

- Switched `frontend` to use new middleware (`1.1.0`)
- New table in `/blocks`
- New more detailed view in `/peers`
- Number of validators & peers is now visible on the main page
- Translations mechanisms (`react-i18next`) - translations are in `public/translations`

### Changed

- Redesigned layout of almost all pages

## [1.0.0] - 2022-10-13

### Added

- Basic block explorer views (blocks, peers, block details, account details, deploy details)
- Block explorer queries directly RPC
- Basic unit tests 
- Configurable branding

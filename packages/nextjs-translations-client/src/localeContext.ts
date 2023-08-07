"use client";

import React from "react";
import { Locale } from "nextjs-translations";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LocaleContext = React.createContext<Locale>(null as any);

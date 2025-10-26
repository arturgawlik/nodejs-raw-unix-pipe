#pragma once

#include "napi.h"

namespace nodejs_raw_unix_pipe {
void compile(const Napi::CallbackInfo &);
void validate(const Napi::CallbackInfo &);
} // namespace nodejs_raw_unix_pipe

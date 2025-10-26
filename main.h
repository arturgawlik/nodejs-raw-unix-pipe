#pragma once

#include "napi.h"

namespace nodejs_raw_unix_pipe {
Napi::Value pipe_create(const Napi::CallbackInfo &);
} // namespace nodejs_raw_unix_pipe

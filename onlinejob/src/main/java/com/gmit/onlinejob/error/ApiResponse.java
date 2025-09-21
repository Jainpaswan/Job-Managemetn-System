package com.gmit.onlinejob.error;

import org.springframework.stereotype.Component;


public class ApiResponse {
    private boolean success;
    private Object data;

    public ApiResponse(boolean success, Object data) {
        this.success = success;
        this.data = data;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

}
